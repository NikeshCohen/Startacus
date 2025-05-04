"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { PasswordInput } from "@/app/(auth)/_components/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { LoaderButton } from "@/components/global/LoaderButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/auth/auth-client";

const formSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type FormValues = z.infer<typeof formSchema>;

function PasswordConfirmationBlocks({
  password,
  confirmationValue,
}: {
  password: string;
  confirmationValue: string;
}) {
  const blocks = Array(Math.max(password.length, 1)).fill(null);

  if (password.length < 2) return;

  return (
    <div className="flex gap-1 pb-1 w-full">
      {blocks.map((_, index) => {
        const flexGrow = blocks.length < 28 ? 1 : 0;
        const baseColor = "#71717a";

        if (index >= confirmationValue.length) {
          return (
            <motion.div
              key={`empty-${index}`}
              className="rounded-full h-[2px]"
              style={{ flexGrow, backgroundColor: baseColor }}
              animate={{ backgroundColor: baseColor }}
              transition={{ duration: 0.2 }}
            />
          );
        }

        if (
          index < password.length &&
          confirmationValue[index] === password[index]
        ) {
          return (
            <motion.div
              key={`match-${index}-${confirmationValue[index]}`}
              className="rounded-full h-[2px]"
              style={{ flexGrow }}
              initial={{ backgroundColor: baseColor }}
              animate={{ backgroundColor: "#22c55e" }}
              exit={{ backgroundColor: baseColor }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          );
        }

        return (
          <motion.div
            key={`error-${index}-${confirmationValue[index]}`}
            className="rounded-full h-[2px]"
            style={{ flexGrow }}
            initial={{ backgroundColor: baseColor }}
            animate={{ backgroundColor: "#ef4444" }}
            exit={{ backgroundColor: baseColor }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        );
      })}
    </div>
  );
}

function SignUpForm({ redirectUrl }: { redirectUrl: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const password = useWatch({
    control: form.control,
    name: "password",
    defaultValue: "",
  });

  const passwordConfirmation = useWatch({
    control: form.control,
    name: "passwordConfirmation",
    defaultValue: "",
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      await signUp.email({
        email: values.email,
        password: values.password,
        name: values.username,
        callbackURL: redirectUrl,
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
            setError(ctx.error.message);
            setLoading(false);
          },
          onSuccess: async () => {
            router.push("/verify-email");
          },
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("An error occurred during sign up");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 grid">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Username"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Password"
                  autoComplete="password"
                  hideLabel
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Confirm Password"
                  autoComplete="current-password"
                  hideLabel
                  {...field}
                />
              </FormControl>
              <PasswordConfirmationBlocks
                password={password}
                confirmationValue={passwordConfirmation}
              />
            </FormItem>
          )}
        />

        <LoaderButton type="submit" className="w-full" isLoading={loading}>
          Create your account
        </LoaderButton>

        {error && (
          <p className="w-full text-red-500 text-xs text-center">{error}</p>
        )}
      </form>
    </Form>
  );
}

export default SignUpForm;
