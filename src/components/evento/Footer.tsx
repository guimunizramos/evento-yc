export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-xs text-muted-foreground md:text-sm">
          © {new Date().getFullYear()} YouCon Arquitetura e Engenharia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
