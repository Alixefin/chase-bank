// This is a new file
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function ZellePage() {
  return (
    <div className="space-y-8 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Send Money with Zelle®</CardTitle>
          <CardDescription>
            A fast, safe and easy way to send money to friends and family.
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
