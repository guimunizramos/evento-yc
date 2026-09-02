import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-lg text-muted-foreground">Esta página não existe ou o evento já encerrou.</p>
      <Link href="/" className="mt-2 text-sm font-semibold text-primary underline underline-offset-4">Ver eventos da YouCon</Link>
    </main>
  );
}
