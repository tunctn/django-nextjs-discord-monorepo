"use client";

import { useGetToken } from "@/lib/api/token";
import { useDiscordSdk } from "@/lib/discord-sdk";
import { env } from "@/lib/env";
import { DiscordAuthenticatedContext } from "@/types/discord";
import { CommandResponse } from "@discord/embedded-app-sdk";
import { useEffect } from "react";
import { toast } from "sonner";
import { create } from "zustand";

interface AuthenticatedContextStore {
  isPending: boolean;
  setPending: (pending: boolean) => void;

  isSuccess: boolean;
  setSuccess: (success: boolean) => void;

  isFetching: boolean;
  setFetching: (fetching: boolean) => void;

  error: string | undefined;
  setError: (error: string | undefined) => void;

  authenticatedContext: DiscordAuthenticatedContext;
  setAuthenticatedContext: (authenticated: DiscordAuthenticatedContext) => void;
}

const DEFAULT_CHANNEL: CommandResponse<"getChannel"> = {
  bitrate: 0,
  guild_id: "",
  id: "",
  messages: [],
  name: "",
  type: 0,
  voice_states: [],
};

export const useAuthenticatedContextStore = create<AuthenticatedContextStore>(
  (set) => ({
    isPending: true,
    setPending: (isPending) => set({ isPending }),

    isFetching: false,
    setFetching: (isFetching) => set({ isFetching }),

    isSuccess: false,
    setSuccess: (isSuccess) => set({ isSuccess }),

    error: undefined,
    setError: (error) => set({ error }),

    authenticatedContext: {
      user: {
        id: "",
        username: "",
        discriminator: "",
        avatar: null,
        public_flags: 0,
      },
      access_token: "",
      scopes: [],
      expires: "",
      application: {
        rpc_origins: undefined,
        id: "",
        name: "",
        icon: null,
        description: "",
      },
      channel: DEFAULT_CHANNEL,
    },
    setAuthenticatedContext: (authenticatedContext) =>
      set({ authenticatedContext }),
  }),
);

export default function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getTokenMutation = useGetToken();
  const { discordSdk, isMock } = useDiscordSdk();

  const {
    setAuthenticatedContext,
    isFetching,
    setPending,
    setSuccess,
    setFetching,
    error,
    setError,
  } = useAuthenticatedContextStore();

  useEffect(() => {
    const setUpDiscordSdk = async () => {
      if (!discordSdk) return;

      try {
        console.log("Setting up Discord SDK");
        await discordSdk.ready();
        console.log("Discord SDK is ready");

        // Authorize with Discord Client
        const { code } = await discordSdk.commands.authorize({
          client_id: env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
          response_type: "code",
          state: "",
          prompt: "none",
          // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
          scope: [
            // Activities will launch through app commands and interactions of user-installable apps.
            // https://discord.com/developers/docs/tutorials/developing-a-user-installable-app#configuring-default-install-settings-adding-default-install-settings
            "applications.commands",

            // "applications.builds.upload",
            // "applications.builds.read",
            // "applications.store.update",
            // "applications.entitlements",
            // "bot",
            "identify",
            // "connections",
            // "email",
            // "gdm.join",
            "guilds",
            // "guilds.join",
            "guilds.members.read",
            // "messages.read",
            // "relationships.read",
            // 'rpc.activities.write',
            // "rpc.notifications.read",
            // "rpc.voice.write",
            "rpc.voice.read",
            // "webhook.incoming",
          ],
        });

        // Retrieve an access_token from your embedded app's server
        let access_token: string | null = null;

        if (isMock === false) {
          const mutation = await getTokenMutation.mutateAsync({ code });
          access_token = mutation.access_token;

          if (!access_token) {
            return setError("No access token received");
          }
        }

        // Authenticate with Discord client (using the access_token)
        const newAuth = await discordSdk.commands.authenticate({
          access_token,
        });

        // Get discord channel info
        let channel: CommandResponse<"getChannel"> = DEFAULT_CHANNEL;
        if (discordSdk.channelId != null && discordSdk.guildId != null) {
          channel = await discordSdk.commands.getChannel({
            channel_id: discordSdk.channelId,
          });
        }

        if (isMock) {
          channel.guild_id = "mock_guild_id";
        }

        // Finally, we construct our authenticatedContext object to be consumed throughout the app
        setAuthenticatedContext({ ...newAuth, channel });
        setSuccess(true);
      } catch (e) {
        setError(JSON.stringify(e));
      } finally {
        setFetching(false);
        setPending(false);
      }
    };

    if (discordSdk && isFetching === false) {
      setPending(true);
      setUpDiscordSdk();
      setFetching(true);
    }
  }, [discordSdk, isMock]);

  if (error) {
    console.log({ error });
    toast.error(
      "An error occurred while authenticating with Discord. Please try again. Check the console for more information.",
    );
    return children;
  }

  return children;
}
