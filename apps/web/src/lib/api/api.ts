"use client";
import { useDetectIframe } from "@/hooks/use-detect-iframe";
import { ApiStatus } from "@/types/api-status";
import { useQuery } from "@tanstack/react-query";

import ky from "ky";
import { env } from "../env";

export const useApi = () => {
  const isIframe = useDetectIframe();

  let prefixUrl = env.NEXT_PUBLIC_API_ENDPOINT;
  if (isIframe) prefixUrl = "/.proxy/django-api"; // Proxy the API through the Discord server

  return { api: ky.create({ prefixUrl }), prefixUrl, isIframe };
};

export const useApiHealth = () => {
  const { api } = useApi();
  return useQuery({
    queryKey: ["api-health"],
    queryFn: async () => {
      return await api.get<ApiStatus>("").json();
    },
  });
};
