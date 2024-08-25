"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import { type ReactNode } from "react";
import AuthenticationProvider from "./use-authenticated-context";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="left" initialIsOpen={false} />
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </QueryClientProvider>
  );

  // return (
  //   <div className="flex h-full grow items-center justify-center text-sm text-muted-foreground">
  //     This app can only be used within Discord.
  //   </div>
  // );
};
