'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  const { user } = useAuth();
  const userInitial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://placehold.co/80x80.png`} alt={user?.name} data-ai-hint="person" />
              <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user?.name}</CardTitle>
              <CardDescription>Personal information and settings.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user?.name} readOnly />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user?.email} readOnly />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
          <CardDescription>Manage your notification and theme preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                    </p>
                </div>
                <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                    Get text messages for important security alerts.
                    </p>
                </div>
                <Switch />
            </div>
             <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                    Toggle to enable or disable dark theme. (UI placeholder)
                    </p>
                </div>
                <Switch disabled/>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
