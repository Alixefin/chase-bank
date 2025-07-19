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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};


export default function TransferPage() {
  const { accounts, transferFunds } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  
  const FormSchema = z.object({
    fromAccountId: z.string({ required_error: "Please select an account to transfer from." }),
    toAccountId: z.string({ required_error: "Please select an account to transfer to." }),
    amount: z.coerce.number().positive({ message: "Amount must be positive." }),
  }).refine(data => data.fromAccountId !== data.toAccountId, {
    message: "Cannot transfer to the same account.",
    path: ["toAccountId"],
  }).refine(data => {
    const fromAccount = accounts.find(acc => acc.id === data.fromAccountId);
    return fromAccount ? data.amount <= fromAccount.balance : false;
  }, {
    message: "Insufficient funds for this transfer.",
    path: ["amount"],
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleTransferConfirm() {
    const values = form.getValues();
    transferFunds(values.fromAccountId, values.toAccountId, values.amount);
    toast({
      title: "Transfer Successful",
      description: `${formatCurrency(values.amount)} has been transferred.`,
    });
    setIsConfirming(false);
    form.reset();
    router.push('/dashboard');
  }
  
  function onSubmit() {
    setIsConfirming(true);
  }

  const values = form.watch();
  const fromAccount = accounts.find(acc => acc.id === values.fromAccountId);
  const toAccount = accounts.find(acc => acc.id === values.toAccountId);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Internal Transfer</CardTitle>
        <CardDescription>Move funds between your SecureBank accounts.</CardDescription>
      </CardHeader>
      <CardContent>
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
                      {accounts.map(acc => (
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
                      {accounts.map(acc => (
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
                        <Input type="number" placeholder="0.00" className="pl-7" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
                <AlertDialogTrigger asChild>
                    <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
                        Review Transfer
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Your Transfer</AlertDialogTitle>
                    <AlertDialogDescription>
                        Please review the details below before confirming. This action cannot be undone.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">From:</span>
                            <span>{fromAccount?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">To:</span>
                            <span>{toAccount?.name}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span className="text-muted-foreground">Amount:</span>
                            <span>{formatCurrency(values.amount || 0)}</span>
                        </div>
                    </div>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleTransferConfirm}>Confirm Transfer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
