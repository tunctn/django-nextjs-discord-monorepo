import type { CommandResponse } from "@discord/embedded-app-sdk";

export type DiscordAuthenticatedContext = CommandResponse<"authenticate"> & {
  channel: CommandResponse<"getChannel">;
};
