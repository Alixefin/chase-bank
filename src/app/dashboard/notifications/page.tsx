
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Landmark, ShieldAlert } from "lucide-react";

const notifications = [
    {
        id: 1,
        icon: ShieldAlert,
        title: "Warning: Account Suspended",
        description: "Your account has been suspended due to unusual activity. No transactions can be made. Please contact support immediately.",
        time: "5 minutes ago",
        read: false
    },
    {
        id: 3,
        icon: Landmark,
        title: "Large Deposit Received",
        description: "A deposit of $55,000.00 has been credited to your Checking account.",
        time: "2 days ago",
        read: true
    },
]

export default function NotificationsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Review recent alerts and manage your notification settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {notifications.map(n => (
                             <div key={n.id} className={`flex items-start gap-4 p-4 rounded-lg ${!n.read ? 'bg-red-100 border border-red-200' : 'bg-card'}`}>
                                <n.icon className={`h-6 w-6 mt-1 ${!n.read ? 'text-destructive' : 'text-muted-foreground'}`} />
                                <div className="flex-1">
                                    <p className={`font-semibold ${!n.read ? 'text-destructive' : ''}`}>{n.title}</p>
                                    <p className="text-sm text-muted-foreground">{n.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Push Notifications</p>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium">Email Notifications</p>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="font-medium">SMS Alerts</p>
                        <Switch />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
