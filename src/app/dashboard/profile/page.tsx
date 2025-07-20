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
  const userInitial = user?.firstName?.charAt(0).toUpperCase() || "U";

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/img/David.jpg" alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user.firstName} {user.lastName}</CardTitle>
              <CardDescription>Personal information and contact details.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user.firstName} readOnly />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue={user.lastName} readOnly />
              </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email} readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
