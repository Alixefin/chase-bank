

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightLeft,
  LayoutDashboard,
  CreditCard,
  CandlestickChart,
  User as UserIcon,
  Bell,
  Wallet,
  FileText,
  PiggyBank,
  ChevronDown,
  MessageCircle,
  WalletCards,
  CircleUserRound,
  Home,
  Star,
  MoreHorizontal,
  Plus,
  BarChart2,
  Phone,
  Settings,
  HelpCircle,
  Briefcase,
  LogOut,
} from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard-header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import type { User } from "@/lib/data";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/transfer", icon: ArrowRightLeft, label: "Pay & Transfer" },
  { href: "/dashboard/cards", icon: CreditCard, label: "Cards" },
  { href: "/dashboard/investing", icon: CandlestickChart, label: "Investing" },
  { href: "/dashboard/statements", icon: FileText, label: "Statements" },
  { href: "/dashboard/rewards", icon: Wallet, label: "Rewards & Deals" },
];

const mobileNavItems = [
    { href: "/dashboard", icon: Home, label: "Accounts" },
    { href: "/dashboard/transfer", icon: ArrowRightLeft, label: "Pay & transfer" },
    { href: "/dashboard/investing", icon: BarChart2, label: "Plan & track" },
    { href: "/dashboard/rewards", icon: Star, label: "Offers" },
    { href: "/dashboard/more", icon: MoreHorizontal, label: "More" },
];

const MobileHeader = ({ user, logout }: { user: User | null; logout: () => void; }) => (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-background px-4">
        <div className="flex items-center gap-4">
            <Link href="/dashboard/chat">
                <MessageCircle className="text-muted-foreground" />
            </Link>
            <Link href="/dashboard/wallet">
                <WalletCards className="text-muted-foreground" />
            </Link>
        </div>
        <Logo className="h-8 w-8 text-primary" />
        <div className="flex items-center gap-4">
             <Link href="/dashboard/notifications">
                <Bell className="text-muted-foreground" />
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button>
                        <CircleUserRound className="text-muted-foreground" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                     <DropdownMenuItem asChild>
                         <Link href="/dashboard/profile">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>{user?.name}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                         <Link href="/dashboard/profile">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </header>
);

const MobileFooter = () => {
    const pathname = usePathname();
    return (
        <footer className="sticky bottom-0 z-10 border-t bg-background">
            <nav className="flex justify-around items-center h-16">
                {mobileNavItems.map((item) => (
                    <Link key={item.label} href={item.href} className={cn(
                        "flex flex-col items-center justify-center gap-1 text-xs font-medium w-full h-full",
                        pathname.startsWith(item.href) && item.href !== '/dashboard/more' ? "text-primary" : "text-muted-foreground",
                        pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}>
                        <item.icon className="h-6 w-6" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </footer>
    );
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const loggedInUser = localStorage.getItem('secureBankUser');
    if (!loggedInUser) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isMobile) {
      return (
        <div className="flex flex-col min-h-screen bg-background">
            <MobileHeader user={user} logout={logout} />
            <main className="flex-1 overflow-y-auto pb-16">
                {children}
            </main>
            <MobileFooter />
        </div>
      );
  }

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon" className="bg-white border-r-0">
        <SidebarHeader className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-800 group-data-[collapsible=icon]:hidden">
              CHASE
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href} className="px-2">
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className={`justify-start ${pathname === item.href ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-primary/5 hover:text-primary'}`}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 space-y-4">
             <Card className="bg-blue-50 group-data-[collapsible=icon]:hidden">
                <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center">
                        <PiggyBank className="w-6 h-6 text-primary"/>
                    </div>
                    <p className="text-sm font-semibold mt-2">Expand your banking possibilities</p>
                    <p className="text-xs text-muted-foreground mt-1">12 Months 0% APR</p>
                    <Button size="sm" className="w-full mt-3">Add Account</Button>
                </CardContent>
            </Card>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://placehold.co/40x40.png`} alt={user.name} data-ai-hint="person" />
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="text-sm font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">Los Angeles, CA</p>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mb-2" align="end" forceMount>
                    <DropdownMenuItem asChild>
                         <Link href="/dashboard/profile">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profile & Settings</span>
                        </Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild>
                        <Link href="/dashboard/notifications">
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                         <Link href="/dashboard/support">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Help & Support</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#F5F7FA]">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}
