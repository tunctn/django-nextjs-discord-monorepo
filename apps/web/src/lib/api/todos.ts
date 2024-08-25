import { useApi } from "@/lib/api";
import { InsertTodoPayload, Todo, UpdateTodoPayload } from "@/types/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "todos";

export const useTodos = ({ channelId }: { channelId: string }) => {
  const { api } = useApi();
  return useQuery({
    queryKey: [QUERY_KEY, channelId],
    refetchInterval: 1000,
    queryFn: async (): Promise<Todo[]> => {
      return await api
        .get("to-dos/", {
          searchParams: new URLSearchParams({
            channel_id: channelId,
          }),
        })
        .json();
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async (newTodo: InsertTodoPayload) => {
      return await api.post("to-dos/", { json: newTodo }).json();
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.channel_id],
      });
    },
  });
};

export const useUpdateTodo = ({ channelId }: { channelId: string }) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdateTodoPayload) => {
      return await api.patch(`to-dos/${id}/`, { json: payload }).json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY, channelId] });
    },
  });
};

export const useDeleteTodo = ({ channelId }: { channelId: string }) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async (id: number) => {
      return await api.delete(`to-dos/${id}/`).json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY, channelId] });
    },
  });
};

export const useDeleteAllTodos = ({ channelId }: { channelId: string }) => {
  const queryClient = useQueryClient();
  const { api } = useApi();
  return useMutation({
    mutationFn: async () => {
      return await api
        .delete(`to-dos/delete/`, {
          searchParams: new URLSearchParams({
            channel_id: channelId,
          }),
        })
        .json();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY, channelId] });
    },
  });
};
