
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ChevronDown, MoreHorizontal, ChevronRight, Briefcase, Landmark, PiggyBank, CreditCardIcon, Plus, ShieldAlert, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import type { Account, Transaction, User } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { format } from 'date-fns';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const cashFlowData = [
  { name: 'Jan', Income: 4000, Expenses: 2400 },
  { name: 'Feb', Income: 3000, Expenses: 1398 },
  { name: 'Mar', Income: 5000, Expenses: 3800 },
  { name: 'Apr', Income: 2780, Expenses: 1908 },
  { name: 'May', Income: 4890, Expenses: 2800 },
  { name: 'Jun', Income: 2390, Expenses: 1800 },
];

const expensesData = [
    { name: 'Groceries', value: 1500, color: '#0062FF' },
    { name: 'Shopping', value: 1377, color: '#13C296' },
    { name: 'Technology', value: 470, color: '#8C54FF'},
    { name: 'More', value: 200, color: '#FF9143' },
];

const mockTransactionsData = [
    { logo: '/img/spotify.png', company: 'Spotify', category: 'Entertainment', amount: -12.99, date: '2025-06-25', dataAiHint: 'logo music' },
    { logo: '/img/chickfila.png', company: 'Chick-Fil-A', category: 'Dining', amount: -27.32, date: '2025-06-25', dataAiHint: 'logo food' },
    { logo: '/img/disney.png', company: 'Disney+', category: 'Streaming Service', amount: -7.99, date: '2025-06-24', dataAiHint: 'logo movie' },
    { logo: '/img/chevron.png', company: 'Chevron', category: 'Gas', amount: -53.70, date: '2025-06-23', dataAiHint: 'logo gas' },
    { logo: '/img/nike.png', company: 'Nike', category: 'Apparel', amount: -235.17, date: '2025-06-23', dataAiHint: 'logo shoe' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function DashboardPage() {
  const { user, accounts, transactions } = useAuth();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDashboard user={user} accounts={accounts} transactions={transactions} />
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content */}
        <div className="lg:col-span-12 grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Left side of main content */}
            <div className="xl:col-span-2 space-y-6">
                <MyCards user={user} accounts={accounts} />
                <CashFlowChart />
                <ExpensesByCategory />
            </div>

            {/* Right side of main content */}
            <div className="xl:col-span-1 space-y-6">
                <RecentTransactions transactions={transactions}/>
                <TransferWidget />
            </div>
        </div>
    </div>
  );
}

interface DashboardProps {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
}

const MyCards = ({ user, accounts }: { user: User | null, accounts: Account[] }) => {
    return (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Cards</CardTitle>
            <MoreHorizontal className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent>
                    <CarouselItem>
                        <div className="p-1">
                           <div className="relative aspect-[1.58] bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-sm opacity-80">Balance</span>
                                        <p className="text-2xl font-bold">{formatCurrency(5000)}</p>
                                    </div>
                                    <span className="font-bold text-lg">Credit</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-lg tracking-widest">···· ···· ···· 4562</p>
                                    <div className="flex justify-between items-end text-sm">
                                        <div>
                                            <span className="opacity-80 block text-xs">Card Holder</span>
                                            {user?.firstName} {user?.lastName}
                                        </div>
                                        <div>
                                            <span className="opacity-80 block text-xs">Expires</span>
                                            03/26
                                        </div>
                                        <Image src="/img/visa-logo.png" alt="Visa Logo" width={40} height={20} data-ai-hint="logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
                  <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
                </div>
            </Carousel>
        </CardContent>
    </Card>
)};

const CashFlowChart = () => (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cash Flow</CardTitle>
            <Button variant="outline" size="sm">This Year <ChevronDown className="h-4 w-4 ml-2" /></Button>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cashFlowData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} barGap={10} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                    <Bar dataKey="Income" fill="#0062FF" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Expenses" fill="#171717" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const ExpensesByCategory = () => {
    const expensesList = [
        { category: "Restaurants", amount: 451 },
        { category: "Flights", amount: 397 },
        { category: "Entertainment", amount: 286 },
        { category: "Outdoor Activites", amount: 193 },
        { category: "Gifts", amount: 50 },
    ];

    return (
        <Card className="bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Expenses By Category</CardTitle>
                <Button variant="outline" size="sm">This Month <ChevronDown className="h-4 w-4 ml-2" /></Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="w-full h-[250px]">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={expensesData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                    {expensesData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                         {expensesList.map(item => (
                            <div key={item.category} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{item.category}</span>
                                <span className="font-medium">{formatCurrency(item.amount)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transactions</CardTitle>
            <Button asChild variant="link" size="sm" className="text-primary"><Link href="/dashboard/accounts/acc-1">See all</Link></Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {transactions.slice(0, 5).map(t => (
                    <div key={t.id} className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 rounded-lg">
                           <AvatarImage src={`https://placehold.co/40x40/png`} data-ai-hint={t.description.split(' ')[0]} />
                           <AvatarFallback>{t.description.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">{t.description}</p>
                            <p className="text-xs text-muted-foreground">{t.type}</p>
                        </div>
                        <div className="text-right">
                            <p className={`font-medium ${t.amount > 0 ? 'text-green-600' : ''}`}>{formatCurrency(t.amount)}</p>
                            <p className="text-xs text-muted-foreground">{format(new Date(t.date), 'MMM d, yyyy')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const TransferWidget = () => (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transfer</CardTitle>
            <MoreHorizontal className="text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <label className="text-sm font-medium text-muted-foreground">Choose Recipient</label>
                <div className="flex items-center space-x-2 mt-2">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">+</Button>
                    {['person1', 'person2', 'person3', 'person4'].map(p => (
                        <Avatar key={p} className="h-10 w-10">
                            <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="person face" />
                            <AvatarFallback>{p.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ))}
                </div>
            </div>
            <div className="flex justify-around bg-muted p-1 rounded-lg">
                 {['Zelle', 'Pay', 'Venmo', 'Paypal'].map((method, index) => (
                    <Button key={method} variant={index === 0 ? 'default' : 'ghost'} className={`flex-1 ${index === 0 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                        {method}
                    </Button>
                 ))}
            </div>
            <div>
                 <Button variant="outline" className="w-full justify-between h-12">
                    <span>$13,497.27</span>
                    <span className="text-muted-foreground">VISA ···· 4562</span>
                    <ChevronDown />
                </Button>
            </div>
            <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input type="text" defaultValue="2,500" className="pl-7 pr-16 py-2 h-12 w-full bg-muted rounded-md text-lg font-semibold" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">USD</span>
                </div>
                <Button className="h-12 bg-primary text-primary-foreground px-6">Transfer</Button>
            </div>
        </CardContent>
    </Card>
);


const MobileDashboard = ({ user, accounts, transactions }: DashboardProps) => {
    const [showAlert, setShowAlert] = useState(false);

    const openAccountItems = [
        { icon: CreditCardIcon, label: 'Credit cards', hint: 'credit card' },
        { icon: Landmark, label: 'Checking', hint: 'bank' },
        { icon: PiggyBank, label: 'Savings & CDs', hint: 'piggy bank' },
        { icon: Briefcase, label: 'Business', hint: 'briefcase' },
    ];

    const checkingAccount = accounts.find(a => a.name === 'Checking');
    const savingsAccount = accounts.find(a => a.name === 'Savings');
    const recentTransactions = transactions.filter(t => t.accountId === 'acc-1').slice(0, 3);

    const handleSuspendedClick = () => {
        setShowAlert(true);
    };

    return (
        <div className="p-4 space-y-6">
             <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Account Suspended</AlertDialogTitle>
                    <AlertDialogDescription>
                        Your account is currently suspended. This service cannot be accessed. Please contact support for assistance.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <QuickActionButton icon={Plus} label="Add" href="#" onClick={handleSuspendedClick} />
                <QuickActionButton label="Send | Zelle®" isText href="#" onClick={handleSuspendedClick} />
                <QuickActionButton label="Deposit checks" isText href="#" onClick={handleSuspendedClick} />
                <QuickActionButton label="Pay bills" isText href="#" onClick={handleSuspendedClick} />
            </div>

            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Account Suspended</AlertTitle>
                <AlertDescription>
                    Your account access is temporarily limited. Please contact us.
                </AlertDescription>
            </Alert>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Accounts</h2>
                    <MoreHorizontal className="text-muted-foreground" />
                </div>
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-none">
                        <Card className="shadow-sm">
                            <AccordionTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-t-lg hover:no-underline">
                                <span className="font-semibold">Bank accounts (2)</span>
                            </AccordionTrigger>
                            <AccordionContent className="p-0 bg-card rounded-b-lg">
                                {checkingAccount && (
                                    <Link href={`/dashboard/accounts/${checkingAccount.id}`} className="block p-4 border-b">
                                        <div className="flex justify-between items-center text-sm font-semibold text-primary mb-2">
                                            <span>CHASE SECURE BANKING ...9403)</span>
                                            <ChevronRight />
                                        </div>
                                        <p className="text-3xl font-bold tracking-tight">{formatCurrency(checkingAccount.balance)}</p>
                                        <p className="text-sm text-muted-foreground">Available balance</p>
                                    </Link>
                                )}
                                {savingsAccount && (
                                    <Link href={`/dashboard/accounts/${savingsAccount.id}`} className="block p-4">
                                        <div className="flex justify-between items-center text-sm font-semibold text-primary mb-2">
                                            <span>SAVINGS (...7784)</span>
                                            <ChevronRight />
                                        </div>
                                        <p className="text-3xl font-bold tracking-tight">{formatCurrency(savingsAccount.balance)}</p>
                                        <p className="text-sm text-muted-foreground">Available balance</p>
                                    </Link>
                                )}
                                <div className="border-t my-0"></div>
                                <div className="p-4">
                                <Link href="#" className="flex justify-between items-center text-primary font-semibold" onClick={handleSuspendedClick}>
                                    <span>Link external accounts</span>
                                    <ChevronRight />
                                </Link>
                                </div>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                </Accordion>
            </div>

             <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {recentTransactions.map(t => (
                            <div key={t.id} className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10 rounded-lg">
                                   <AvatarImage src={`https://placehold.co/40x40/png`} data-ai-hint={t.description.split(' ')[0]} />
                                   <AvatarFallback>{t.description.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium">{t.description}</p>
                                    <p className="text-xs text-muted-foreground">{format(new Date(t.date), 'MMM d, yyyy')}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-medium ${t.amount > 0 ? 'text-green-600' : ''}`}>{formatCurrency(t.amount)}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button asChild variant="outline" className="w-full">
                            <Link href="/dashboard/accounts/acc-1">View all transactions</Link>
                         </Button>
                    </CardFooter>
                </Card>
            </div>


            <div>
                <h2 className="text-lg font-bold mb-2">Open an account</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {openAccountItems.map(item => (
                        <Card key={item.label} className="p-4 flex flex-col items-center justify-center text-center space-y-2" onClick={handleSuspendedClick}>
                            <item.icon className="w-8 h-8 text-primary" />
                            <span className="text-sm font-semibold">{item.label}</span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const QuickActionButton = ({ icon: Icon, label, isText = false, href, onClick }: { icon?: React.ElementType, label: string, isText?: boolean, href: string, onClick?: () => void }) => {
    const content = isText ? (
        <Button variant="ghost" className="bg-gray-100 rounded-full h-auto py-2 px-3 text-primary font-semibold text-xs shadow-sm w-full">
            {label}
        </Button>
    ) : (
        <div className="flex flex-col items-center space-y-1">
            <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full w-12 h-12 shadow-sm">
                {Icon && <Icon className="w-6 h-6 text-primary" />}
            </Button>
        </div>
    );

    if (onClick) {
        return (
            <div className="flex-1" onClick={onClick} role="button">
                {content}
            </div>
        )
    }

    return (
        <Link href={href} className="flex-1">
            {content}
        </Link>
    )
}


    