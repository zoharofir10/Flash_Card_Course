export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <main className="text-center p-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Flash Card Course - z
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your Next.js application is running successfully!
        </p>
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <p>
            Edit <code className="bg-muted px-2 py-1 rounded text-sm">src/app/page.tsx</code> to get started.
          </p>
        </div>
      </main>
    </div>
  );
}
