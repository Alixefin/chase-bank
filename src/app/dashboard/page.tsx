
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, MoreHorizontal, ChevronRight, Briefcase, Landmark, PiggyBank, CreditCardIcon, Plus } from 'lucide-react';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import type { Account, User } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const cashFlowData = [
  { name: 'Jan', Income: 4000, Expenses: 2400 },
  { name: 'Feb', Income: 3000, Expenses: 1398 },
  { name: 'Mar', Income: 5000, Expenses: 3800 },
  { name: 'Apr', Income: 2780, Expenses: 1908 },
  { name: 'May', Income: 4890, Expenses: 2800 },
  { name: 'Jun', Income: 2390, Expenses: 1800 },
  { name: 'Jul', Income: 3490, Expenses: 2300 },
  { name: 'Aug', Income: 4200, Expenses: 2100 },
  { name: 'Sep', Income: 3100, Expenses: 1500 },
];

const expensesData = [
    { name: 'Groceries', value: 1500, color: '#0062FF' },
    { name: 'Shopping', value: 1377, color: '#13C296' },
    { name: 'Technology', value: 470, color: '#8C54FF'},
    { name: 'More', value: 200, color: '#FF9143' },
];

const mockTransactionsData = [
    { logo: '/img/spotify.png', company: 'Spotify', category: 'Entertainment', amount: -12.99, date: 'Sep 25, 2021', dataAiHint: 'logo music' },
    { logo: '/img/chickfila.png', company: 'Chick-Fil-A', category: 'Dining', amount: -27.32, date: 'Sep 25, 2021', dataAiHint: 'logo food' },
    { logo: '/img/disney.png', company: 'Disney+', category: 'Streaming Service', amount: -7.99, date: 'Sep 24, 2021', dataAiHint: 'logo movie' },
    { logo: '/img/chevron.png', company: 'Chevron', category: 'Gas', amount: -53.70, date: 'Sep 23, 2021', dataAiHint: 'logo gas' },
    { logo: '/img/nike.png', company: 'Nike', category: 'Apparel', amount: -235.17, date: 'Sep 23, 2021', dataAiHint: 'logo shoe' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function DashboardPage() {
  const { user, accounts } = useAuth();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileDashboard user={user} accounts={accounts} />
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
                <RecentTransactions transactions={mockTransactionsData}/>
                <TransferWidget />
            </div>
        </div>
    </div>
  );
}

interface UserProps {
  user: User | null;
  accounts: Account[];
}

const MyCards = ({ user, accounts }: UserProps) => {
    const checkingAccount = accounts.find(a => a.name === 'Checking');
    const savingsAccount = accounts.find(a => a.name === 'Savings');
    const creditCardAccount = accounts.find(a => a.name === 'Credit Card');

    return (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Cards</CardTitle>
            <MoreHorizontal className="text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
                <CarouselContent>
                    {checkingAccount && (
                    <CarouselItem className="basis-full md:basis-1/2">
                        <div className="p-1">
                           <div className="relative aspect-[1.58] bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between">
                                <div>
                                    <span className="text-sm opacity-80">Balance</span>
                                    <p className="text-2xl font-bold">{formatCurrency(checkingAccount.balance)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-lg tracking-widest">···· ···· ···· 4562</p>
                                    <div className="flex justify-between items-end text-sm">
                                        <div>
                                            <span className="opacity-80 block text-xs">Card Holder</span>
                                            {user?.name}
                                        </div>
                                        <div>
                                            <span className="opacity-80 block text-xs">Expires</span>
                                            03/24
                                        </div>
                                        <Image src="/img/visa-logo.png" alt="Visa Logo" width={40} height={20} data-ai-hint="logo" />
                                    </div>
                                </div>
                               <div className="absolute top-6 right-6 text-2xl font-bold -rotate-90 origin-bottom-left">Debit</div>
                            </div>
                        </div>
                    </CarouselItem>
                    )}
                    {savingsAccount && (
                    <CarouselItem className="basis-full md:basis-1/2">
                       <div className="p-1">
                           <div className="relative aspect-[1.58] bg-gradient-to-br from-teal-400 to-green-500 rounded-xl p-6 text-white flex flex-col justify-between">
                                <div>
                                    <span className="text-sm opacity-80">Balance</span>
                                    <p className="text-2xl font-bold">{formatCurrency(savingsAccount.balance)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-lg tracking-widest">···· ···· ···· 7784</p>
                                    <div className="flex justify-between items-end text-sm">
                                       <div>
                                            <span className="opacity-80 block text-xs">Account Holder</span>
                                            {user?.name}
                                        </div>
                                        <div>
                                            <span className="opacity-80 block text-xs">Account Type</span>
                                            Savings
                                        </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    )}
                    {creditCardAccount && (
                     <CarouselItem className="basis-full md:basis-1/2">
                       <div className="p-1">
                           <div className="relative aspect-[1.58] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white flex flex-col justify-between">
                                <div>
                                    <span className="text-sm opacity-80">Balance</span>
                                    <p className="text-2xl font-bold">{formatCurrency(creditCardAccount.balance)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-mono text-lg tracking-widest">···· ···· ···· 1544</p>
                                    <div className="flex justify-between items-end text-sm">
                                        <div>
                                            <span className="opacity-80 block text-xs">Card Holder</span>
                                            {user?.name}
                                        </div>
                                        <div>
                                            <span className="opacity-80 block text-xs">Expires</span>
                                            12/26
                                        </div>
                                        <Image src="/img/visa-logo.png" alt="Visa Logo" width={40} height={20} data-ai-hint="logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                    )}
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
  transactions: {
    logo: string;
    company: string;
    category: string;
    amount: number;
    date: string;
    dataAiHint: string;
  }[];
}

const RecentTransactions = ({ transactions }: RecentTransactionsProps) => (
    <Card className="bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transactions</CardTitle>
            <Button variant="link" size="sm" className="text-primary">See all</Button>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {transactions.map(t => (
                    <div key={t.company} className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10 rounded-lg">
                           <AvatarImage src={`https://placehold.co/40x40/png`} data-ai-hint={t.dataAiHint} />
                           <AvatarFallback>{t.company.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-medium">{t.company}</p>
                            <p className="text-xs text-muted-foreground">{t.category}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-medium">{formatCurrency(t.amount)}</p>
                            <p className="text-xs text-muted-foreground">{t.date}</p>
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


const MobileDashboard = ({ user, accounts }: UserProps) => {
    const openAccountItems = [
        { icon: CreditCardIcon, label: 'Credit cards', hint: 'credit card' },
        { icon: Landmark, label: 'Checking', hint: 'bank' },
        { icon: PiggyBank, label: 'Savings & CDs', hint: 'piggy bank' },
        { icon: Briefcase, label: 'Business', hint: 'briefcase' },
    ];

    const checkingAccount = accounts.find(a => a.name === 'Checking');

    return (
        <div className="p-4 space-y-6">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <QuickActionButton icon={Plus} label="Add" />
                <QuickActionButton label="Send | Zelle®" isText />
                <QuickActionButton label="Deposit checks" isText />
                <QuickActionButton label="Pay bills" isText />
            </div>

            <Card className="bg-blue-50 border-blue-200 shadow-md">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-full">
                            <Image src="https://placehold.co/24x24.png" width={24} height={24} alt="snapshot icon" data-ai-hint="money cash"/>
                        </div>
                        <div>
                            <div className="font-bold">Snapshot <Badge variant="secondary" className="ml-1 text-xs">30 sec read</Badge></div>
                            <p className="text-sm text-muted-foreground">Your money in this month is $750.</p>
                        </div>
                    </div>
                    <ChevronRight className="text-muted-foreground" />
                </CardContent>
            </Card>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Accounts</h2>
                    <MoreHorizontal className="text-muted-foreground" />
                </div>
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1" className="border-none">
                        <Card className="shadow-sm">
                            <AccordionTrigger className="bg-primary text-primary-foreground px-4 py-2 rounded-t-lg hover:no-underline">
                                <span className="font-semibold">Bank accounts (1)</span>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-card rounded-b-lg">
                                {checkingAccount && (
                                    <Link href={`/dashboard/accounts/${checkingAccount.id}`} className="block">
                                        <div className="flex justify-between items-center text-sm font-semibold text-primary mb-2">
                                            <span>CHASE SECURE BANKING ...9403)</span>
                                            <ChevronRight />
                                        </div>
                                        <p className="text-3xl font-bold tracking-tight">{formatCurrency(checkingAccount.balance)}</p>
                                        <p className="text-sm text-muted-foreground">Available balance</p>
                                    </Link>
                                )}
                                <div className="border-t my-4"></div>
                                <Link href="#" className="flex justify-between items-center text-primary font-semibold">
                                    <span>Link external accounts</span>
                                    <ChevronRight />
                                </Link>
                            </AccordionContent>
                        </Card>
                    </AccordionItem>
                </Accordion>
            </div>

            <div>
                <h2 className="text-lg font-bold mb-2">Open an account</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {openAccountItems.map(item => (
                        <Card key={item.label} className="p-4 flex flex-col items-center justify-center text-center space-y-2">
                            <item.icon className="w-8 h-8 text-primary" />
                            <span className="text-sm font-semibold">{item.label}</span>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const QuickActionButton = ({ icon: Icon, label, isText = false }: { icon?: React.ElementType, label: string, isText?: boolean }) => {
    if (isText) {
        return (
            <Button variant="ghost" className="bg-gray-100 rounded-full h-auto py-2 px-3 text-primary font-semibold text-xs shadow-sm">
                {label}
            </Button>
        )
    }
    return (
        <div className="flex flex-col items-center space-y-1">
            <Button variant="ghost" size="icon" className="bg-gray-100 rounded-full w-12 h-12 shadow-sm">
                {Icon && <Icon className="w-6 h-6 text-primary" />}
            </Button>
        </div>
    )
}
