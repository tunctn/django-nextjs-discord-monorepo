"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCreateTodo,
  useDeleteAllTodos,
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "@/lib/api/todos";
import { cn } from "@/lib/utils";
import { type Todo, UpdateTodoPayload } from "@/types/todo";
import { CheckIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import { useAuthenticatedContextStore } from "./use-authenticated-context";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { authenticatedContext } = useAuthenticatedContextStore();

  const updateTodoMutation = useUpdateTodo({
    channelId: authenticatedContext.channel.id,
  });
  const toggleTodo = (payload: UpdateTodoPayload) => {
    updateTodoMutation.mutate(payload);
  };

  const removeTodoMutation = useDeleteTodo({
    channelId: authenticatedContext.channel.id,
  });
  const removeTodo = (id: number) => {
    removeTodoMutation.mutate(id);
  };

  return (
    <div
      key={todo.id}
      className={cn("flex items-center space-x-2 border-b px-4 py-2", {
        "bg-foreground/5": todo.is_completed,
      })}
    >
      <div className="flex flex-grow flex-col">
        <span
          className={cn(
            "-mb-1 flex-grow text-[10px] text-muted-foreground/70",
            {
              "text-muted-foreground/40": todo.is_completed,
            },
          )}
        >
          {todo.added_by_username}
        </span>
        <span
          className={cn("flex-grow text-sm", {
            "text-muted-foreground line-through": todo.is_completed,
          })}
        >
          {todo.title}
        </span>
      </div>
      <Button
        className="group"
        onClick={() =>
          toggleTodo({ id: todo.id, is_completed: !todo.is_completed })
        }
        variant="outline"
        loadingDotsSize={4}
        size="xs-icon"
        isLoading={updateTodoMutation.isPending}
      >
        <CheckIcon
          size={15}
          className={cn("transition-opacity", {
            "opacity-0 group-hover:opacity-50": todo.is_completed === false,
            "opacity-100": todo.is_completed === true,
          })}
        />
        <span className="sr-only">
          {todo.is_completed ? "Mark as incomplete" : "Mark as complete"}
        </span>
      </Button>
      <Button
        onClick={() => removeTodo(todo.id)}
        variant="destructiveGhost"
        size="xs-icon"
        loadingDotsSize={4}
        isLoading={removeTodoMutation.isPending}
      >
        <TrashIcon size={15} />
        <span className="sr-only">Delete Todo</span>
      </Button>
    </div>
  );
};

const TodoList = () => {
  const { authenticatedContext } = useAuthenticatedContextStore();

  const todos = useTodos({ channelId: authenticatedContext.channel.id });

  const deleteAllTodosMutation = useDeleteAllTodos({
    channelId: authenticatedContext.channel.id,
  });
  const deleteAll = () => {
    deleteAllTodosMutation.mutate();
  };

  const isLoading = todos.isLoading;
  const data = todos.data ?? [];
  const hasNoData = data.length === 0;

  const InfoBox = ({ children }: { children: ReactNode }) => {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    );
  };

  return (
    <div>
      <div className="h-[400px] rounded-md border">
        {isLoading === false && (
          <div className="h-full w-full">
            {data.length > 0 && (
              <ScrollArea className="h-[398px] w-full">
                {data
                  .sort((a, b) => {
                    // Sort by id
                    if (a.id > b.id) {
                      return 1;
                    }
                    if (a.id < b.id) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((todo) => (
                    <TodoItem todo={todo} key={todo.id} />
                  ))}
              </ScrollArea>
            )}

            {hasNoData && (
              <InfoBox>
                <div className="text-sm text-muted-foreground">
                  No todos yet. Add one to get started!
                </div>
              </InfoBox>
            )}
          </div>
        )}

        {isLoading && (
          <InfoBox>
            <div className="text-sm text-foreground/30">Loading todos...</div>
          </InfoBox>
        )}
      </div>

      <Button
        variant="destructive"
        onClick={deleteAll}
        className="mt-5 w-full"
        disabled={deleteAllTodosMutation.isPending || hasNoData}
      >
        Delete All 🔥
      </Button>
    </div>
  );
};

const TodoListCardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="h-full w-full grow border-0 lg:max-w-md lg:grow-0 lg:border">
      <CardContent className="flex min-h-[500px] flex-col p-6">
        {children}
      </CardContent>
    </Card>
  );
};

const TodoListCard = () => {
  const { authenticatedContext } = useAuthenticatedContextStore();

  const [newTodo, setNewTodo] = useState("");

  const createTodoMutation = useCreateTodo();
  const createTodo = () => {
    if (newTodo === "") {
      return toast.error(`Title is required.`);
    }

    createTodoMutation.mutate(
      {
        title: newTodo,
        added_by_id: authenticatedContext.user.id,
        added_by_username: authenticatedContext.user.username,
        guild_id: authenticatedContext.channel.guild_id ?? null,
        channel_id: authenticatedContext.channel.id,
      },
      { onSuccess: () => setNewTodo("") },
    );
  };

  return (
    <TodoListCardWrapper>
      <h1 className="mb-6 text-center text-3xl font-bold">
        {authenticatedContext.channel.name} Todos
      </h1>
      <div className="mb-6 flex gap-2">
        <div className="grow">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </div>

        <Button
          isLoading={createTodoMutation.isPending}
          size="icon"
          onClick={createTodo}
        >
          <PlusIcon size={20} />
          <span className="sr-only">Add Todo</span>
        </Button>
      </div>
      <TodoList />
    </TodoListCardWrapper>
  );
};

export const TodoBox = () => {
  const { isPending, isSuccess, error } = useAuthenticatedContextStore();

  return (
    <>
      {isSuccess && <TodoListCard />}
      {isPending && (
        <TodoListCardWrapper>
          <div className="flex h-full grow flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <div>Loading your channel</div>
          </div>
        </TodoListCardWrapper>
      )}
      {error && (
        <TodoListCardWrapper>
          <div className="flex h-full grow flex-col items-center justify-center text-sm text-muted-foreground">
            <div>An error occured while loading your channel.</div>
            <div>Reconnecting might work hehe.</div>
          </div>
        </TodoListCardWrapper>
      )}
    </>
  );
};
