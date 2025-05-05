import { Toaster as ReactHotToast, ToasterProps } from "react-hot-toast";

export default function Toaster(props: ToasterProps) {
  return (
    <ReactHotToast
      {...props}
      position={props.position || "top-right"}
      toastOptions={{
        ...props.toastOptions,
        style: {
          background: "var(--background)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          ...props.toastOptions?.style,
        },
        success: {
          ...props.toastOptions?.success,
          iconTheme: {
            primary: "var(--primary)",
            secondary: "white",
            ...props.toastOptions?.success?.iconTheme,
          },
        },
        error: {
          ...props.toastOptions?.error,
          duration: 4000,
          style: {
            background: "var(--background)",
            color: "var(--foreground)",
            ...props.toastOptions?.error?.style,
          },
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "var(--destructive-foreground)",
            ...props.toastOptions?.error?.iconTheme,
          },
        },
      }}
    />
  );
}
