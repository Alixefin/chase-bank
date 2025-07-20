
"use client";

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);


export default function WalletPage() {
    const { user, accounts } = useAuth();
    
    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Wallet</h1>
                <Button variant="ghost" size="icon">
                    <PlusCircle className="w-6 h-6" />
                </Button>
            </div>

            <div className="space-y-4">
                <div className="relative aspect-[1.58] bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
                    <div className="flex justify-between items-start">
                        <span className="font-bold text-lg">Credit</span>
                        <div className="w-16">
                           <Image src="/img/visa-logo.png" alt="Visa Logo" width={60} height={20} />
                        </div>
                    </div>
                    <div>
                        <span className="text-sm opacity-80">Balance</span>
                        <p className="text-2xl font-bold">{formatCurrency(5000)}</p>
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
                        </div>
                    </div>
                </div>
            </div>

            <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Add card to wallet
            </Button>
        </div>
    );
}
