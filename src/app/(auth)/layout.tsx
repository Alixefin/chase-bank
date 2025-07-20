import { Logo } from "@/components/logo";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Lighthouse background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="lighthouse trees"
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        <main className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 mb-8">
            <Logo className="h-12 w-12 text-white" />
            <h1 className="text-5xl font-extrabold text-white tracking-wider">SecureBank</h1>
        </div>
        {children}
        </main>
        <footer className="absolute bottom-4 left-0 right-0 z-20">
            <div className="container mx-auto flex items-center justify-center gap-4 text-white">
                <span>Follow us:</span>
                <Facebook className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Instagram className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Twitter className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Youtube className="h-5 w-5 cursor-pointer hover:opacity-80" />
                <Linkedin className="h-5 w-5 cursor-pointer hover:opacity-80" />
            </div>
        </footer>
    </div>
  );
}
