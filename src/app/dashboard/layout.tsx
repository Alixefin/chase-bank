
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRightLeft,
  LayoutDashboard,
  CreditCard,
  Landmark,
  CandlestickChart,
  LifeBuoy,
  User as UserIcon,
  Bell,
  Wallet,
  FileText,
  PiggyBank,
  ChevronDown
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

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/transfer", icon: ArrowRightLeft, label: "Transactions" },
  { href: "/dashboard/cards", icon: CreditCard, label: "Credit Cards" },
  { href: "/dashboard/statements", icon: FileText, label: "Statements" },
  { href: "/dashboard/rewards", icon: Wallet, label: "Rewards & Deals" },
  { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();
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

            <div className="flex items-center gap-3">
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
