"use client";

import { useId, useState } from "react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
}

export function PasswordInput({
  label = "Password",
  hideLabel = false,
  id: propId,
  className,
  ...props
}: PasswordInputProps) {
  const generatedId = useId();
  const id = propId || generatedId;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      {!hideLabel && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          className={cn("pr-9", className)}
          placeholder="Password"
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <button
          className="right-0 focus:z-10 absolute inset-y-0 flex justify-center items-center disabled:opacity-50 focus-visible:border-ring rounded-e-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 w-9 h-full text-muted-foreground/80 hover:text-foreground transition-[color,box-shadow] disabled:cursor-not-allowed disabled:pointer-events-none"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls={id}
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
