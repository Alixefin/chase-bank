'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Landmark, PiggyBank, ArrowRight, ArrowRightLeft } from 'lucide-react';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function DashboardPage() {
  const { user, accounts } = useAuth();

  const getAccountIcon = (accountName: string) => {
    switch (accountName) {
      case 'Checking':
        return <Landmark className="h-6 w-6 text-muted-foreground" />;
      case 'Savings':
        return <PiggyBank className="h-6 w-6 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here&apos;s a summary of your accounts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {accounts.map((account) => (
          <Card key={account.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
              {getAccountIcon(account.name)}
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{formatCurrency(account.balance)}</div>
              <p className="text-xs text-muted-foreground">Available balance</p>
              <Button asChild variant="ghost" className="mt-4 px-0">
                <Link href={`/dashboard/accounts/${account.id}`}>
                  View transactions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common actions quickly.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/dashboard/transfer">
                    <ArrowRightLeft className="mr-2 h-4 w-4"/>
                    Make a Transfer
                </Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
