"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { submitFeedback } from "@/actions/emails";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const feedbackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  feedbackType: z.enum(["bug", "suggestion", "question", "other"], {
    message: "Please select a feedback type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: FeedbackFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Sending feedback...");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("feedbackType", data.feedbackType);
      formData.append("message", data.message);

      const result = await submitFeedback(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to send feedback");
      }

      toast.success("Thank you! Your feedback has been sent.", { id: toastId });
      form.reset();

      // Redirect back after a short delay
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send feedback. Please try again.",
        { id: toastId },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="from-background to-muted/20 flex min-h-screen items-center justify-center bg-linear-to-b p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">
              Send us your feedback
            </CardTitle>
            <CardDescription className="text-base">
              We&apos;d love to hear from you. Let us know what you think or if
              you need help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
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
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="feedbackType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">
                            I&apos;ve encountered an error
                          </SelectItem>
                          <SelectItem value="suggestion">
                            I have a suggestion
                          </SelectItem>
                          <SelectItem value="question">
                            I have a question
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your feedback..."
                          className="min-h-[150px] resize-none"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Feedback
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Need immediate help?{" "}
          <Link
            href="mailto:info@startacus.app"
            className="text-primary hover:underline"
          >
            Email us directly
          </Link>
        </p>
      </div>
    </div>
  );
}
