"use client";

import { Link } from "@/components/ui/link";
import { useApi, useApiHealth } from "@/lib/api";

export const ApiHealthIndicator = () => {
  const apiHealth = useApiHealth();
  const { prefixUrl } = useApi();

  const hasConnected = apiHealth.data?.status === "ok";
  const isError = apiHealth.error;
  const isLoading = apiHealth.isLoading;

  return (
    <div className="text-center text-xs">
      {hasConnected && (
        <div className="text-muted-foreground">
          Connected to{" "}
          <Link className="text-blue-500" target="_blank" href={prefixUrl}>
            Django API
          </Link>
        </div>
      )}
      {isLoading && (
        <div className="text-muted-foreground/50">
          Checking connection to Django API...
        </div>
      )}
      {isError && (
        <div className="text-destructive-foreground">
          Error connecting to Django API at {prefixUrl}.
        </div>
      )}
    </div>
  );
};
