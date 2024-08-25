export type Todo = {
  id: number;
  title: string;
  is_completed: boolean;

  guild_id: string | null;
  channel_id: string;

  added_by_id: string;
  added_by_username: string;
};

export type InsertTodoPayload = {
  title: string;

  guild_id: string | null;
  channel_id: string;

  added_by_id: string;
  added_by_username: string;
};

export type UpdateTodoPayload = {
  id: number;
  is_completed: boolean;
};
