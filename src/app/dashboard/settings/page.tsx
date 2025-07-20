
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";


export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences.</CardDescription>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Update your security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Change Password</Label>
                        <p className="text-sm text-muted-foreground">
                        Update the password used to log in to your account.
                        </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                </div>
                <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Change PIN</Label>
                        <p className="text-sm text-muted-foreground">
                        Modify the PIN used for ATM and debit transactions.
                        </p>
                    </div>
                    <Button variant="outline">Change PIN</Button>
                </div>
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>

         <Card>
            <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                        Toggle to enable or disable dark theme.
                        </p>
                    </div>
                    <Switch disabled />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
