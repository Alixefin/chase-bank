
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const FormSchema = z.object({
    fromAccountId: z.string({ required_error: "Please select an account to transfer from." }),
    toAccountId: z.string({ required_error: "Please select an account to transfer to." }),
    amount: z.coerce.number().positive({ message: "Amount must be positive." }),
}).refine(data => data.fromAccountId !== data.toAccountId, {
    message: "Cannot transfer to the same account.",
    path: ["toAccountId"],
});

const InternalTransferForm = () => {
    const { accounts } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fromAccountId: "",
            toAccountId: "",
            amount: 0,
        },
    });
    
    function onSubmit() {
        setShowAlert(true);
    }

    return (
        <>
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Account Suspended</AlertDialogTitle>
                <AlertDialogDescription>
                    Your account is currently suspended. This action cannot be completed. Please contact support for assistance.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction onClick={() => setShowAlert(false)}>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fromAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account to transfer from" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.filter(a=> a.name !== 'Credit Card').map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - {formatCurrency(acc.balance)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account to transfer to" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.filter(a => a.name !== 'Credit Card').map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - {formatCurrency(acc.balance)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-7"
                          {...field}
                          onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
                Review Transfer
            </Button>
          </form>
        </Form>
        </>
    )
}

const SuspendedService = ({ title, description, buttonText }: {title: string, description: string, buttonText: string}) => {
    const [showAlert, setShowAlert] = useState(false);
    
    return (
        <>
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
        <div className="text-center py-8">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">{description}</p>
            <Button className="mt-6" onClick={() => setShowAlert(true)}>{buttonText}</Button>
        </div>
        </>
    )
}


export default function TransferPage() {

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Pay & Transfer</CardTitle>
        <CardDescription>Move money, pay bills, and send funds to others.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <h2 className="text-lg font-semibold mb-2">Internal Transfer</h2>
            <p className="text-sm text-muted-foreground mb-4">Move money between your SecureBank accounts.</p>
            <InternalTransferForm />
        </div>
        
        <Separator />
        
        <SuspendedService 
            title="Send Money with Zelle®"
            description="A fast, safe and easy way to send money to friends and family using just their U.S. mobile number or email address."
            buttonText="Send Money"
        />

        <Separator />
        
        <SuspendedService 
            title="Pay Bills"
            description="Manage and pay all your bills from one place. Set up one-time or recurring payments."
            buttonText="Go to Bill Pay"
        />

      </CardContent>
    </Card>
  );
}
