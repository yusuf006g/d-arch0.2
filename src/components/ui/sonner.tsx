"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type SonnerProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: SonnerProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      // Sonner может ожидать 'dark' | 'light' | 'system' или похожее —
      // безопасно приводим:
      theme={theme as unknown as SonnerProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
