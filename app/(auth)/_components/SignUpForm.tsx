"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

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
    <div className="flex w-full gap-1 pb-1">
      {blocks.map((_, index) => {
        const flexGrow = blocks.length < 28 ? 1 : 0;

        if (index >= confirmationValue.length) {
          return (
            <motion.div
              key={index}
              className="bg-muted-foreground h-[2px] rounded-full"
              style={{ flexGrow }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.5 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            />
          );
        }

        if (
          index < password.length &&
          confirmationValue[index] === password[index]
        ) {
          return (
            <motion.div
              key={index}
              className="h-[2px] rounded-full bg-green-500"
              style={{ flexGrow }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          );
        }

        return (
          <motion.div
            key={index}
            className="h-[2px] rounded-full bg-red-500"
            style={{ flexGrow }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.05,
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
            setLoading(false);
          },
          onSuccess: async () => {
            router.push(redirectUrl);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                  placeholder="bobjones@example.com"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
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
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
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
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
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
      </form>
    </Form>
  );
}

export default SignUpForm;
