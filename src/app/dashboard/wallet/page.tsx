
"use client";

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);


export default function WalletPage() {
    const { user, accounts } = useAuth();
    const checkingAccount = accounts.find(a => a.name === 'Checking');
    const creditCardAccount = accounts.find(a => a.name === 'Credit Card');

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Wallet</h1>
                <Button variant="ghost" size="icon">
                    <PlusCircle className="w-6 h-6" />
                </Button>
            </div>

            <div className="space-y-4">
                {checkingAccount && (
                    <div className="relative aspect-[1.58] bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
                        <div>
                            <span className="text-sm opacity-80">Balance</span>
                            <p className="text-2xl font-bold">{formatCurrency(checkingAccount.balance)}</p>
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
                        <div className="absolute top-6 right-6 text-2xl font-bold -rotate-90 origin-bottom-left">Debit</div>
                    </div>
                )}

                {creditCardAccount && (
                    <div className="relative aspect-[1.58] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
                        <div>
                            <span className="text-sm opacity-80">Balance</span>
                            <p className="text-2xl font-bold">{formatCurrency(creditCardAccount.balance)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-mono text-lg tracking-widest">···· ···· ···· 1544</p>
                            <div className="flex justify-between items-end text-sm">
                                <div>
                                    <span className="opacity-80 block text-xs">Card Holder</span>
                                    {user?.firstName} {user?.lastName}
                                </div>
                                <div>
                                    <span className="opacity-80 block text-xs">Expires</span>
                                    12/26
                                </div>
                                <Image src="/img/visa-logo.png" alt="Visa Logo" width={40} height={20} data-ai-hint="logo" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add card to wallet
            </Button>
        </div>
    );
}
