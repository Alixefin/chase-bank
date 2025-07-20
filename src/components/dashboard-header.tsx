
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const getTitleFromPathname = (pathname: string) => {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname.startsWith('/dashboard/accounts')) return 'Account Details';
  if (pathname.startsWith('/dashboard/transfer')) return 'Transactions';
  if (pathname.startsWith('/dashboard/cards')) return 'Credit Cards';
  if (pathname.startsWith('/dashboard/statements')) return 'Statements';
  if (pathname.startsWith('/dashboard/rewards')) return 'Rewards & Deals';
  if (pathname.startsWith('/dashboard/notifications')) return 'Notifications';
  if (pathname.startsWith('/dashboard/profile')) return 'User Profile';
  return 'SecureBank';
};


export function DashboardHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  const userInitial = user?.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-transparent px-4 md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <h1 className="flex-1 text-2xl font-bold text-gray-800">{title}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="/img/user-avatar.png" alt={`${user?.firstName} ${user?.lastName}`} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
