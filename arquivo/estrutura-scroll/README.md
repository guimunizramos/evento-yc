# Estrutura metálica: versão guiada pelo scroll (arquivada em 05/09/2026)

Primeira versão da seção "Do projeto à estrutura" da `/metalica`. A cena ficava
presa na tela (`sticky`) por um percurso de 260–300vh e o scroll controlava os
quatro atos: locação deita → pilares sobem → vigas → cobertura. Funcionava bem,
mas segurava a navegação e o Gui achou que perderia gente no meio do caminho.
Foi substituída por uma animação de tempo (~2,5 s ao entrar na tela), com a
rolagem livre, em `src/components/evento/estrutura/EstruturaSection.tsx`.

Para reativar esta versão:
1. Copiar `EstruturaSection.tsx` daqui por cima do atual (mesmos dados em `dados.json`,
   mesmo `EventoConfig.estrutura`).
2. Conferir se o bloco `.estrutura-cena` em `src/app/globals.css` ainda é igual a
   `estrutura.css` (as variáveis `--deitar/--pilares/--vigas/--cobertura` e o `--a`
   por peça são os mesmos nas duas versões).

Mecânica: o scroll só escreve as 4 variáveis CSS e a matriz do plano por quadro;
os ~900 traços animam por `calc/clamp` no CSS. Reduced motion mostra a estrutura pronta.
