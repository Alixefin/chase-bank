import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
       <div className="flex items-center gap-2 mb-8">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">SecureBank</h1>
      </div>
      {children}
    </main>
  );
}
