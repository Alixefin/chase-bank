import { Logo } from "@/components/logo";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="absolute inset-0 bg-white z-0" />
      <div className="absolute inset-0 z-10">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Abstract blue background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
            data-ai-hint="blue abstract"
          />
      </div>

      <main className="relative z-20 flex flex-grow w-full flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2 mb-8">
          <Logo className="h-12 w-12 text-primary" />
        </div>
        {children}
      </main>

      <footer className="relative z-20 w-full bg-white py-8 px-4 text-xs text-gray-600">
        <div className="container mx-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span>Follow us:</span>
            <Facebook className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <Instagram className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <Twitter className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <Youtube className="h-5 w-5 cursor-pointer hover:opacity-80" />
            <Linkedin className="h-5 w-5 cursor-pointer hover:opacity-80" />
          </div>

          <hr className="mb-4" />

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4 text-center">
            <Link href="#" className="hover:underline">Contact us</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Security</Link>
            <Link href="#" className="hover:underline">Terms of use</Link>
            <Link href="#" className="hover:underline">Accessibility</Link>
            <Link href="#" className="hover:underline">SAFE Act: Chase Mortgage Loan Originators</Link>
            <Link href="#" className="hover:underline">Fair Lending</Link>
            <Link href="#" className="hover:underline">About Chase</Link>
            <Link href="#" className="hover:underline">J.P. Morgan</Link>
            <Link href="#" className="hover:underline">JPMorgan Chase & Co.</Link>
            <Link href="#" className="hover:underline">Careers</Link>
            <Link href="#" className="hover:underline">Español</Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-6">
            <Link href="#" className="hover:underline">Chase Canada</Link>
            <Link href="#" className="hover:underline">Site map</Link>
            <span>Member FDIC</span>
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Equal Housing Opportunity</span>
            </div>
          </div>
          
          <p className="text-center text-gray-500">(c) 2025 JPMorgan Chase & Co.</p>
        </div>
      </footer>
    </div>
  );
}
