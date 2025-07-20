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
      style={{ backgroundImage: "url('/img/blue-abstract-background.png')" }}
    >
      <header className="flex justify-center py-8">
        <Logo className="h-10 w-32" />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 mb-8">
        {children}
      </main>
      <footer className="bg-white/95 py-8 text-sm text-gray-600">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <span>Follow us:</span>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 fill-current" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 fill-current" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="h-5 w-5 fill-current" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 fill-current" />
            </Link>
          </div>

          <hr className="mb-4" />

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
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

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            <Link href="#" className="hover:underline">Chase Canada</Link>
            <Link href="#" className="hover:underline">Site map</Link>
            <span>Member FDIC</span>
            <span className="flex items-center gap-1">
              <EqualHousingIcon className="h-5 w-5" />
              Equal Housing Opportunity
            </span>
          </div>

          <p className="text-center text-xs text-gray-500">
            (c) 2025 JPMorgan Chase & Co.
          </p>
        </div>
      </footer>
    </div>
  );
}


function EqualHousingIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 3L4 9v12h16V9l-8-6zm-1 9H9v5h2v-5zm4 0h-2v5h2v-5z" />
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );
}
