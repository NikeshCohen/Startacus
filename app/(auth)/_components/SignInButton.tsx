import * as React from "react";

import { ChevronRight } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type GetStartedButtonProps = ButtonProps & {
  iconSize?: number;
  iconStrokeWidth?: number;
};

const GetStartedButton = React.forwardRef<
  HTMLButtonElement,
  GetStartedButtonProps
>((props, ref) => {
  const {
    className,
    size = "lg",
    children = "Get Started",
    iconSize = 16,
    iconStrokeWidth = 2,
    ...restProps
  } = props;

  return (

  );
});




function SignInButton({
  className,
  size = "lg",
  children = "Get Started",
  iconSize = 16,
  iconStrokeWidth = 2,
}: GetStartedButtonProps) {
  return (
       <Button
      ref={ref}
      size={size}
      variant="default"
      className={cn("group relative overflow-hidden", className)}
      {...restProps}
    >
      <span className="mr-8 transition-opacity duration-300 group-hover:opacity-0">
        {children}
      </span>
      <span
        className="bg-primary-foreground/15 absolute top-1 right-1 bottom-1 z-10 flex w-1/4 items-center justify-center rounded-sm transition-all duration-300 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95"
        aria-hidden="true"
      >
        <ChevronRight size={iconSize} strokeWidth={iconStrokeWidth} />
      </span>
    </Button>
  )
}

export default SignInButton
