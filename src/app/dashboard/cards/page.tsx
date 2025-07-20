
"use client";

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, MoreVertical, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function CardsPage() {
  const { user, accounts } = useAuth();
  const checkingAccount = accounts.find(a => a.name === 'Checking');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>My Cards</CardTitle>
          <CardDescription>
            Manage your debit and credit cards.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="max-w-md mx-auto">
                {checkingAccount && (
                    <div className="relative aspect-[1.58] bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white flex flex-col justify-between shadow-lg">
                        <div>
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-xl">SecureBank</span>
                                <Image src="https://placehold.co/60x30.png" alt="Visa Logo" width={60} height={30} data-ai-hint="visa logo" />
                            </div>
                            <p className="text-sm opacity-80 mt-4">Balance</p>
                            <p className="text-3xl font-bold">{formatCurrency(checkingAccount.balance)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-mono text-xl tracking-widest text-center">···· ···· ···· 4562</p>
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
                )}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Card Controls</CardTitle>
            <CardDescription>Quick actions for your card security.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <ShieldCheck className="w-8 h-8 mb-2 text-primary" />
                <span>Lock Card</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <CreditCard className="w-8 h-8 mb-2 text-primary" />
                <span>Report Lost</span>
            </Button>
             <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <Zap className="w-8 h-8 mb-2 text-primary" />
                <span>Set Limits</span>
            </Button>
             <Button variant="outline" className="flex flex-col h-24 items-center justify-center">
                <MoreVertical className="w-8 h-8 mb-2 text-primary" />
                <span>More</span>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
