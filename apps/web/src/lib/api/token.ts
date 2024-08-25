import { useMutation } from "@tanstack/react-query";
import { useApi } from "./api";

interface GetTokenResponse {
  access_token: string;
}

export const useGetToken = () => {
  const { api } = useApi();
  return useMutation({
    mutationFn: async ({
      code,
    }: {
      code: string;
    }): Promise<GetTokenResponse> => {
      return await api.post("token/", { json: { code } }).json();
    },
  });
};
