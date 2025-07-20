
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";


export default function BillPayPage() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="space-y-8 p-4">
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
              <AlertDialogHeader>
              <AlertDialogTitle>Account Suspended</AlertDialogTitle>
              <AlertDialogDescription>
                  Your account is currently suspended. This service cannot be accessed. Please contact support for assistance.
              </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      <Card>
        <CardHeader>
          <CardTitle>Pay Bills</CardTitle>
          <CardDescription>
            Manage and pay all your bills from one place.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <h3 className="text-xl font-semibold">Service Unavailable</h3>
            <p className="text-muted-foreground mt-2">Bill Pay is currently unavailable due to account restrictions.</p>
            <Button className="mt-6" onClick={() => setShowAlert(true)}>Learn More</Button>
        </CardContent>
      </Card>
    </div>
  );
}
