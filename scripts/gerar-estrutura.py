"""
Gera src/components/evento/estrutura/dados.json a partir do PDF do projeto
estrutural (prancha "Cortes e perspectivas", vista "3D ESTRUTURA PRINCIPAL").

Uso:  python3 scripts/gerar-estrutura.py <caminho do PDF>
Depende de PyMuPDF (pip install pymupdf). Recorte da vista em gerar-estrutura-clip.json
(coordenadas da página já rotacionada). Classifica os traços em pilares (verticais
pretos), vigas (demais traços pretos), cobertura (cinza longos) e blocos (cinza
curtos na base). A locação dos pilares vem do topo de cada pilar desprojetado
pelos eixos A/B da laje; P0 é a vista de cima e T a matriz que a deita na isometria.
"""
import sys, os
import fitz, math, json
E=sys.argv[1] if len(sys.argv)>1 else "0258-ES01-PE-03-R00.pdf"
AQUI=os.path.dirname(os.path.abspath(__file__))
doc=fitz.open(E); pg=doc[0]; M=pg.rotation_matrix
clip=fitz.Rect(*json.load(open(os.path.join(AQUI,"gerar-estrutura-clip.json")))["clip"])
A=(-717.3,122.4); B=(358.5,216.8)
def unit(v): L=math.hypot(*v); return (v[0]/L, v[1]/L)
Ah,Bh=unit(A),unit(B)
def ang(v): return math.degrees(math.atan2(v[1],v[0]))
def dirclass(dx,dy):
    if abs(dx)<2.5: return "V"
    t=ang((dx,dy))
    for nome,ref in (("A",ang(Ah)),("B",ang(Bh))):
        d=abs((t-ref+180)%360-180); d=min(d,180-d)
        if d<1.5: return nome
    return "o"
def T(p): return fitz.Point(p)*M
def seg(a,b): return f"M{a.x:.1f} {a.y:.1f}L{b.x:.1f} {b.y:.1f}"
camadas={"pilares":[], "vigas":[], "cobertura":[], "blocos":[]}
bases=[]
for d in pg.get_drawings():
    if (d.get("width") or 0)>1: continue
    rr=d["rect"]*M
    if not clip.contains(rr): continue
    cor=tuple(round(c,2) for c in (d.get("color") or (0,0,0)))
    preto = cor==(0.0,0.0,0.0)
    if d["type"] in ("f","fs"):
        if preto and d.get("fill")==(0.0,0.0,0.0):
            pts=[]
            for it in d["items"]:
                if it[0]=="l": pts.append(T(it[1]))
                elif it[0]=="qu": pts+=[T(it[1].ul),T(it[1].ur),T(it[1].lr),T(it[1].ll)]
            if pts and (max(p.x for p in pts)-min(p.x for p in pts))<25:
                camadas["pilares"].append({"d":"M"+"L".join(f"{p.x:.1f} {p.y:.1f}" for p in pts)+"Z","fill":True,"y":max(p.y for p in pts)})
        continue
    for it in d["items"]:
        if it[0]!="l": continue
        a,b=T(it[1]),T(it[2]); dx,dy=b.x-a.x,b.y-a.y; L=math.hypot(dx,dy)
        if L<1.5: continue
        k=dirclass(dx,dy)
        if preto:
            if (k=="V" and L>=45) or (k=="o" and L>=45):
                lo,hi=(a,b) if a.y>b.y else (b,a)
                camadas["pilares"].append({"d":seg(lo,hi),"y":round(lo.y,1),"len":round(L)}); bases.append((hi.x,hi.y,k,L))
            elif L>=3:
                camadas["vigas"].append({"d":seg(a,b),"y":round(max(a.y,b.y),1)})
        else:
            if L>=40: camadas["cobertura"].append({"d":seg(a,b),"y":round(max(a.y,b.y),1)})
            elif L>=5 and min(a.y,b.y) > clip.y0 + 0.66*clip.height: camadas["blocos"].append({"d":seg(a,b),"y":round(max(a.y,b.y),1)})
grupos=[]
for x,y,k,L in bases:
    if k!="V": continue  # os pilares em V entram só no desenho, não na locação
    for g in grupos:
        if abs(g["x"]-x)<12 and abs(g["y"]-y)<12:
            g["n"]+=1; g["x"]=(g["x"]*(g["n"]-1)+x)/g["n"]; g["y"]=min(g["y"],y); g["L"]=max(g["L"],L); break
    else: grupos.append({"x":x,"y":y,"n":1,"k":k,"L":L})
import statistics
# altura do pé-direito: mediana dos pilares vistos inteiros (os curtos estão só parcialmente visíveis)
H=statistics.median(g["L"] for g in grupos if g["L"]>=100)
print("altura mediana dos pilares (pt):", round(H,1))
O=(2759.6,761.0-0)   # origem no plano da cobertura (topo dos pilares)
det=Ah[0]*Bh[1]-Ah[1]*Bh[0]
def unproj(x,y):
    px,py=x-O[0],y-O[1]
    return (px*Bh[1]-py*Bh[0])/det, (-px*Ah[1]+py*Ah[0])/det
pil=[]
for g in sorted(grupos,key=lambda g:-g["y"]):
    u,v=unproj(g["x"],g["y"]); pil.append({"iso":[round(g["x"],1),round(g["y"],1)],"uv":[round(u,1),round(v,1)],"n":g["n"],"k":g["k"]})
print("pilares detectados:", len(pil))
for p in pil: print("  ",p)
for k,v in camadas.items(): print(k, len(v))


# ---- prévia dos 3 estágios ----
us=[p["uv"][0] for p in pil]; vs=[p["uv"][1] for p in pil]
cu,cv=(min(us)+max(us))/2,(min(vs)+max(vs))/2
cx,cy=(clip.x0+clip.x1)/2,(clip.y0+clip.y1)/2
# T: (u,v) -> iso.  P0: vista de cima, mesma quiralidade (det<0): espelha v
Tm=(Ah[0],Ah[1],Bh[0],Bh[1],O[0],O[1]+H)
s=0.6
P0=(s,0,0,-s,cx-s*cu,cy+s*cv)
def lerp(a,b,t): return tuple(a[i]+(b[i]-a[i])*t for i in range(6))
def planta_svg():
    g=['<g stroke="#ff6b00" fill="none" stroke-width="1.4">']
    for p in pil: p["uv"]=[round(p["uv"][0],1),round(p["uv"][1],1)]
    for p in pil:
        u,v=p["uv"]; g.append(f'<rect x="{u-6}" y="{v-6}" width="12" height="12" fill="#ff6b00"/>')
    # eixos: linhas por u e por v distintos
    for u in sorted(set(round(x/25)*25 for x in us)):
        g.append(f'<line x1="{u}" y1="{min(vs)-60}" x2="{u}" y2="{max(vs)+60}" stroke="#666" stroke-dasharray="6 6" stroke-width="0.8"/>')
    for v in sorted(set(round(x/25)*25 for x in vs)):
        g.append(f'<line x1="{min(us)-60}" y1="{v}" x2="{max(us)+60}" y2="{v}" stroke="#666" stroke-dasharray="6 6" stroke-width="0.8"/>')
    g.append('</g>'); return "".join(g)
def estrutura_svg(op):
    cor={"pilares":"#ff6b00","vigas":"#ffffff","cobertura":"#9aa0a6","blocos":"#5b6067"}
    out=[]
    for k in ("blocos","pilares","vigas","cobertura"):
        FILL='fill="#ff6b00"'
        paths="".join('<path d="%s" %s/>' % (i["d"], FILL if i.get("fill") else "") for i in camadas[k])
        out.append('<g stroke="%s" fill="none" stroke-width="%s" opacity="%s">%s</g>' % (cor[k], 1.6 if k=="pilares" else 1, op[k], paths))
    return "".join(out)
vb=f"{clip.x0:.1f} {clip.y0:.1f} {clip.width:.1f} {clip.height:.1f}"
W=1000; H=int(W*clip.height/clip.width)
frames=[("1 planta",P0,{"blocos":0,"pilares":0,"vigas":0,"cobertura":0}),("2 deitando",lerp(P0,Tm,0.6),{"blocos":0.3,"pilares":0,"vigas":0,"cobertura":0}),("3 estrutura",Tm,{"blocos":1,"pilares":1,"vigas":1,"cobertura":0.7})]
tiles=[]
for i,(nome,m,op) in enumerate(frames):
    tiles.append(f'<svg x="0" y="{i*(H+30)+30}" width="{W}" height="{H}" viewBox="{vb}"><rect x="{clip.x0}" y="{clip.y0}" width="{clip.width}" height="{clip.height}" fill="#0a0a0a"/>{estrutura_svg(op)}<g transform="matrix({" ".join(f"{x:.4f}" for x in m)})">{planta_svg()}</g></svg><text x="8" y="{i*(H+30)+20}" fill="#ff6b00" font-size="16" font-family="monospace">{nome}</text>')
open(os.path.join(AQUI,"previa-estagios.svg"),"w").write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{3*(H+30)}"><rect width="100%" height="100%" fill="#222"/>'+"".join(tiles)+'</svg>')

# enquadramento justo: caixa de todas as peças + o plano deitado (mesma caixa) + o plano de cima (P0)
import re
xs=[];ys=[]
for k,v in camadas.items():
    for i in v:
        for mx,my in re.findall(r"(-?\d+\.?\d*) (-?\d+\.?\d*)", i["d"]): xs.append(float(mx)); ys.append(float(my))
for u,v in ((min(us)-90,min(vs)-90),(max(us)+90,max(vs)+90)):
    xs.append(P0[0]*u+P0[2]*v+P0[4]); ys.append(P0[1]*u+P0[3]*v+P0[5])
bx0,by0,bx1,by1=min(xs),min(ys),max(xs),max(ys)
pad=0.035*(bx1-bx0)
vbJ=[round(bx0-pad,1),round(by0-pad,1),round(bx1-bx0+2*pad,1),round(by1-by0+2*pad,1)]
print("viewBox justo:", vbJ, "proporção", round(vbJ[2]/vbJ[3],2))
json.dump({"viewBox":vbJ,"P0":[round(x,4) for x in P0],"T":[round(x,4) for x in Tm],"alturaPilar":round(H,1),"pilares":[p["uv"] for p in pil],"grade":{"u":sorted(set(round(x/25)*25 for x in us)),"v":sorted(set(round(x/25)*25 for x in vs))},"camadas":camadas}, open(os.path.join(AQUI,"..","src/components/evento/estrutura/dados.json"),"w"))
print("json ok")
