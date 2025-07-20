// This is a new file
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ChevronRight, FileText, LifeBuoy, MapPin, Shield } from "lucide-react";

const moreLinks = [
    { href: "/dashboard/statements", icon: FileText, label: "Statements" },
    { href: "/dashboard/support", icon: LifeBuoy, label: "Help & Support" },
    { href: "/dashboard/security", icon: Shield, label: "Security Center" },
    { href: "/dashboard/locator", icon: MapPin, label: "Branch & ATM Locator" },
]

export default function MorePage() {
  return (
    <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">More</h1>
        <Card>
            <CardContent className="p-0">
                <ul className="divide-y">
                    {moreLinks.map(item => (
                        <li key={item.label}>
                           <Link href={item.href} className="flex items-center p-4 gap-4">
                                <item.icon className="w-6 h-6 text-primary" />
                                <span className="flex-1 font-medium">{item.label}</span>
                                <ChevronRight className="w-5 h-5 text-muted-foreground" />
                           </Link>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
  );
}
