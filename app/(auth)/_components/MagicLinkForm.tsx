"use client";

import { useState } from "react";

import Link from "next/link";

import AuthCardFooter from "@/app/(auth)/_components/AuthCardFooter";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { LoaderButton } from "@/components/global/LoaderButton";
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

import { authClient } from "@/lib/auth/auth-client";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MagicLinkForm({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noUser, setNoUser] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setNoUser(false);
    setError(null);

    await authClient.signIn.magicLink({
      email: values.email,
      callbackURL: redirectUrl,
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          toast.success("Magic link sent! Check your email inbox");
        },
        onError: (ctx) => {
          if (ctx.error.status === 400) {
            toast.error("Please create an account first");
            setNoUser(true);
            setLoading(false);
          } else {
            toast.error(ctx.error.message);
            setError(ctx.error.message);
            setLoading(false);
          }
          console.log(ctx.error);
        },
      },
    });
  };

  if (success) {
    return (
      <div className="s flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold">Magic link sent successfully</h3>

        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a secure sign-in link to your email address. The link
          will expire in 5 minutes.
        </p>

        <div className="bg-primary/5 mt-8 rounded-lg p-3 text-sm">
          <p className="text-muted-foreground">
            Magic links typically arrive within 1-2 minutes. If you don&apos;t
            see it, please check your spam or junk folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <LoaderButton
              type="submit"
              className="w-full"
              isLoading={loading}
              icon={SendIcon}
            >
              Send Magic Link
            </LoaderButton>

            {noUser && (
              <p className="text-destructive mt-1 w-full text-center text-xs">
                Please create an account first.{" "}
                <Link href="/sign-up" className="underline">
                  Sign Up
                </Link>
              </p>
            )}

            {error && (
              <p className="text-destructive mt-1 w-full text-center text-xs">
                {error}
              </p>
            )}
          </div>
          <Button type="button" asChild variant="outline" className="mt-2">
            <Link href="/sign-in">
              <Lock />
              <span>Continue with Password</span>
            </Link>
          </Button>
        </form>
      </Form>

      <AuthCardFooter />
    </>
  );
}
