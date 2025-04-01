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
            primary: "var(--accent)",
            secondary: "white",
            ...props.toastOptions?.success?.iconTheme,
          },
        },
        error: {
          ...props.toastOptions?.error,
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "white",
            ...props.toastOptions?.error?.iconTheme,
          },
        },
      }}
    />
  );
}
