"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
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
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Please tell us your username." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
  useToken: z.boolean().optional(),
});

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
      useToken: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd have more complex logic here.
    // For this prototype, any login is considered successful.
    login(values.username); 
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
  }

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-2xl">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-semibold">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.username && (
                        <div className="flex items-center text-destructive">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            {form.formState.errors.username.message}
                        </div>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-500">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center text-sm font-bold text-primary hover:underline"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between pt-2">
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        Remember me
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="useToken"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal">
                        Use token
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-bold h-12 rounded-full">
              Sign in
            </Button>
          </form>
        </Form>
        <div className="mt-6 flex flex-col items-start space-y-2 text-sm">
          <Link href="/forgot-password" passHref>
            <span className="font-semibold text-primary hover:underline flex items-center">
                Forgot username/password? <ChevronRightIcon className="h-4 w-4 ml-1" />
            </span>
          </Link>
          <Link href="/register" passHref>
             <span className="font-semibold text-primary hover:underline flex items-center">
                Not Enrolled? Sign Up Now. <ChevronRightIcon className="h-4 w-4 ml-1" />
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
