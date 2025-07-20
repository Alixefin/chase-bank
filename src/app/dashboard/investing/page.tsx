"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function InvestingPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>J.P. Morgan Self-Directed Investing</CardTitle>
          <CardDescription>
            Your investment portfolio overview.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <Construction className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold">Coming Soon</h3>
            <p className="text-muted-foreground">This section is currently under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}
