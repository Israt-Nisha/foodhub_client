"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { User, Briefcase, ShieldCheck, ArrowLeft } from "lucide-react";
import * as z from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});

type Role = "customer" | "provider" | "admin";

const roles: { value: Role; label: string; icon: React.ReactNode }[] = [
  { value: "customer", label: "I'm a Customer", icon: <User className="h-6 w-6" /> },
  { value: "provider", label: "Others", icon: <Briefcase className="h-6 w-6" /> },

];

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const error = searchParams.get("error");

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND_URL!,
    });
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });
        router.push("/");
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  // --- VIEW 1: ROLE SELECTION ---
  if (!selectedRole) {
    return (
      <Card {...props}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>How would you like to login?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error === "google_not_allowed" && (
            <p className="text-sm text-destructive text-center p-2 rounded-md bg-destructive/10">
              Google login is only available for customers.
            </p>
          )}
          {roles.map(({ value, label, icon }) => (
            <Button
              key={value}
              variant="outline"
              className="h-24 flex flex-col gap-2 hover:border-primary transition-all"
              onClick={() => setSelectedRole(value)}
            >
              {icon}
              <span>{label}</span>
            </Button>
          ))}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary underline">
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }

  // --- VIEW 2: LOGIN FORM ---
  return (
    <Card
      {...props}
      className="w-full rounded-lg shadow-lg border border-border bg-card text-card-foreground"
    >
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSelectedRole(null)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>
            Login as {roles.find((r) => r.value === selectedRole)?.label.replace("I'm a ", "").replace("I'm an ", "")}
          </CardTitle>
        </div>
        <CardDescription>
          Enter your credentials to login as a {selectedRole}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button
          form="login-form"
          type="submit"
          className="w-full cursor-pointer"
        >
          Login
        </Button>

        {/* Only customer can use Google login */}
        {selectedRole === "customer" && (
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            type="button"
            className="w-full cursor-pointer"
          >
            Continue with Google
          </Button>
        )}

        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/register" className="text-primary underline">
            Register
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}