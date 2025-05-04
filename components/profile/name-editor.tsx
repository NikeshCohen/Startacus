"use client";

import { useState } from "react";

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

// Form schema for name validation
const nameFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Name must be 32 characters or less"),
});

type NameFormValues = z.infer<typeof nameFormSchema>;

interface NameEditorProps {
  user: User;
}

export function NameEditor({ user }: NameEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<NameFormValues>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: {
      name: user.name || "",
    },
  });

  const onSubmit = async (values: NameFormValues) => {
    if (values.name.trim() === user.name) return;

    setIsUpdating(true);

    await authClient.updateUser(
      {
        name: values.name.trim(),
      },
      {
        onResponse: () => {
          setIsUpdating(false);
        },
        onSuccess: () => {
          toast.success("Name updated successfully");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to update name");
          console.error("Failed to update name:", ctx.error);
          setIsUpdating(false);
        },
      },
    );
  };

  return (
    <div className="bg-card/60 shadow-sm p-4 border rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium text-lg">Name</FormLabel>
                <FormDescription className="pb-1">
                  Please enter your full name, or a display name.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end mt-4 pt-4 border-t">
            <LoaderButton
              type="submit"
              isLoading={isUpdating}
              disabled={isUpdating}
            >
              Save
            </LoaderButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
