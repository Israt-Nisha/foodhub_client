"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as z from "zod";
import { User, Briefcase, ArrowLeft } from "lucide-react"; // Optional: for better UX

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"]),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  // 1. Track if role is selected
  const [selectedRole, setSelectedRole] = useState<"CUSTOMER" | "PROVIDER" | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "PROVIDER",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user...");
      try {
        const { error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User Created Successfully!", { id: toastId });
        router.push("/login");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND_URL!,
    });
  };

  // --- VIEW 1: ROLE SELECTION ---
  if (!selectedRole) {
    return (
      <Card {...props}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Join us</CardTitle>
          <CardDescription>How would you like to use our platform?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 hover:border-primary transition-all"
            onClick={() => {
              setSelectedRole("CUSTOMER");
              form.setFieldValue("role", "CUSTOMER");
            }}
          >
            <User className="h-6 w-6" />
            <span>I'm a Customer</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 hover:border-primary transition-all"
            onClick={() => {
              setSelectedRole("PROVIDER");
              form.setFieldValue("role", "PROVIDER");
            }}
          >
            <Briefcase className="h-6 w-6" />
            <span>I'm a Service Provider</span>
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <a href="/login" className="text-primary underline">Login</a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  // --- VIEW 2: ACTUAL REGISTRATION FORM ---
  return (
    <Card {...props}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
           <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedRole(null)}>
              <ArrowLeft className="h-4 w-4" />
           </Button>
           <CardTitle>Create {selectedRole === "PROVIDER" ? "Provider" : "Customer"} Account</CardTitle>
        </div>
        <CardDescription>Enter your details to register as a {selectedRole.toLowerCase()}.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-1">
            <form.Field name="name">
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button form="signup-form" type="submit" className="w-full cursor-pointer">
          Register
        </Button>

        {selectedRole === "CUSTOMER" && (
          <Button onClick={handleGoogleLogin} variant="outline" type="button" className="w-full cursor-pointer">
            Continue with Google
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}