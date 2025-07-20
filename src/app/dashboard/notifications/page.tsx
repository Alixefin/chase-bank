// This is a new file
"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, CreditCard, Landmark, ShieldAlert, AlertCircle } from "lucide-react";

const notifications = [
    {
        id: 1,
        icon: ShieldAlert,
        title: "Security Alert: New Device Login",
        description: "A new login to your account occurred from Chrome on MacOS. If this wasn't you, please secure your account immediately.",
        time: "15 minutes ago",
        read: false
    },
    {
        id: 2,
        icon: CreditCard,
        title: "Payment Due Reminder",
        description: "Your credit card payment of $250.88 is due in 3 days on June 28, 2025.",
        time: "2 hours ago",
        read: false
    },
    {
        id: 3,
        icon: Landmark,
        title: "Large Deposit Received",
        description: "A deposit of $2,500.00 has been credited to your Checking account.",
        time: "Yesterday",
        read: true
    },
    {
        id: 4,
        icon: AlertCircle,
        title: "Low Balance Alert",
        description: "Your Checking account balance is below your $100 threshold. Current balance is $85.50.",
        time: "3 days ago",
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
                             <div key={n.id} className={`flex items-start gap-4 p-4 rounded-lg ${!n.read ? 'bg-blue-50' : 'bg-card'}`}>
                                <n.icon className={`h-6 w-6 mt-1 ${!n.read ? 'text-primary' : 'text-muted-foreground'}`} />
                                <div className="flex-1">
                                    <p className={`font-semibold ${!n.read ? 'text-primary-foreground' : ''}`}>{n.title}</p>
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
