import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }}
      data-ai-hint="lighthouse house"
    >
      <header className="flex justify-center py-8">
        <h1 className="text-4xl font-bold text-white tracking-widest">CHASE</h1>
      </header>
      <main className="flex flex-1 items-center justify-center px-4">
        {children}
      </main>
      <footer className="flex flex-col items-center gap-4 py-8 text-white">
        <div className="flex items-center gap-4">
          <span className="text-sm">Follow us:</span>
          <div className="flex gap-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
