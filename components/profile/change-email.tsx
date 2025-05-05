"use client";

import { useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { LoaderButton } from "@/components/global/LoaderButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth/auth-client";

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

interface ChangeEmailProps {
  user: User;
}

function ChangeEmail({ user }: ChangeEmailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isEmailVerified = useRef(user?.emailVerified);
  const [sentEmail, setSentEmail] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: user.email || "",
    },
  });

  const handleResendVerification = async () => {
    setIsLoading(true);
    setSentEmail(true);

    await authClient.sendVerificationEmail(
      {
        email: user.email,
        callbackURL: "/confirmed-email?type=verification",
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onSuccess: () => {
          toast.success("Verification email sent successfully");
        },
        onError: (ctx) => {
          // Re-enable button on error
          setSentEmail(false);
          toast.error(ctx.error.message || "Failed to send verification email");
          console.error("Failed to send verification email:", ctx.error);
          setIsLoading(false);
        },
      },
    );
  };

  const onSubmit = async (values: EmailFormValues) => {
    if (values.email.trim() === user.email) return;

    setIsLoading(true);
    try {
      await authClient.changeEmail(
        {
          newEmail: values.email.trim(),
          callbackURL: "/confirmed-email?type=change",
        },
        {
          onResponse: () => {
            setIsLoading(false);
          },
          onSuccess: () => {
            toast.success("Email updated and verification email sent");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to update email");
            console.error("Failed to update email:", ctx.error);
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while updating email");
      console.error(error);
    }
  };

  if (!isEmailVerified.current) {
    return (
      <div className="bg-card/60 rounded-lg border p-4 shadow-sm">
        <div className="text-lg font-medium">Verify Your Email</div>
        <div className="text-muted-foreground pb-1 text-sm">
          Please verify your email address. Check your inbox for the
          verification email. If you haven&apos;t received the email, click the
          button below to resend.
        </div>
        <div className="mt-4 flex justify-end border-t pt-4">
          <LoaderButton
            onClick={handleResendVerification}
            isLoading={isLoading}
            disabled={sentEmail || isLoading}
            size="xs"
          >
            Resend Verification Email
          </LoaderButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/60 rounded-lg border p-4 shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Email Address
                </FormLabel>
                <FormDescription className="pb-1">
                  Change your email address. A verification email will be sent
                  to the new address.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex justify-end border-t pt-4">
            <LoaderButton
              type="submit"
              size="xs"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Save
            </LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ChangeEmail;
