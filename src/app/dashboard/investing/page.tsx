"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, DollarSign, Activity, TrendingUp } from "lucide-react";

const performanceData = [
  { month: 'Jan', value: 10000 },
  { month: 'Feb', value: 10200 },
  { month: 'Mar', value: 10500 },
  { month: 'Apr', value: 11000 },
  { month: 'May', value: 11500 },
  { month: 'Jun', value: 11300 },
];

export default function InvestingPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>J.P. Morgan Self-Directed Investing</CardTitle>
                <CardDescription>Your investment portfolio overview.</CardDescription>
            </div>
            <Button>Trade</Button>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">$11,300.00</p>
                        <p className="text-sm text-green-500 flex items-center justify-center">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>$1,300.00 (13%)</span>
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Day's Gain/Loss</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold text-red-500">-$50.25</p>
                        <p className="text-sm text-red-500">-0.44%</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Buying Power</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold">$2,500.00</p>
                        <p className="text-sm text-muted-foreground">Available to trade</p>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Performance</CardTitle>
          <CardDescription>Your portfolio's growth over the last 6 months.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`}/>
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Market News</CardTitle>
                <CardDescription>Top stories impacting your portfolio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                    <Activity className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="font-semibold">Tech stocks rally on positive inflation data.</p>
                        <p className="text-sm text-muted-foreground">Reuters - 2 hours ago</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <TrendingUp className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <p className="font-semibold">Federal Reserve hints at interest rate stability.</p>
                        <p className="text-sm text-muted-foreground">Associated Press - 5 hours ago</p>
                    </div>
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Research & Tools</CardTitle>
                <CardDescription>Explore investment opportunities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">Stock Screener</Button>
                <Button variant="outline" className="w-full justify-start">ETF Screener</Button>
                <Button variant="outline" className="w-full justify-start">Market Research</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
