// https://github.com/discord/embedded-app-sdk/blob/main/examples/react-colyseus/packages/client/src/discordSdk.tsx

import { DiscordSDK, DiscordSDKMock } from "@discord/embedded-app-sdk";
import { useEffect, useState } from "react";
import { env } from "./env";

enum SessionStorageQueryParam {
  user_id = "user_id",
  guild_id = "guild_id",
  channel_id = "channel_id",
}

function getOverrideOrRandomSessionValue(
  queryParam: `${SessionStorageQueryParam}`,
) {
  const queryParams = new URLSearchParams(window.location.search);

  const overrideValue = queryParams.get(queryParam);
  if (overrideValue != null) {
    return overrideValue;
  }

  const currentStoredValue = sessionStorage.getItem(queryParam);
  if (currentStoredValue != null) {
    return currentStoredValue;
  }

  // Set queryParam to a random 8-character string
  const randomString = Math.random().toString(36).slice(2, 10);
  sessionStorage.setItem(queryParam, randomString);
  return randomString;
}

export const useDiscordSdk = () => {
  const [discordSdk, setDiscordSdk] = useState<
    DiscordSDK | DiscordSDKMock | null
  >(null);
  const [isMock, setIsMock] = useState<boolean>(false);

  useEffect(() => {
    let queryParams: URLSearchParams = new URLSearchParams();
    if (typeof window !== undefined) {
      queryParams = new URLSearchParams(window.location.search);
    }
    const isEmbedded = queryParams.get("frame_id") != null;

    if (isEmbedded) {
      setIsMock(false);
      try {
        const newDiscordSdk = new DiscordSDK(env.NEXT_PUBLIC_DISCORD_CLIENT_ID);
        setDiscordSdk(newDiscordSdk);
      } catch (e) {
        console.log({
          msg: "Error initializing Discord SDK",
          error: e,
        });
      }
    } else {
      setIsMock(true);
      // We're using session storage for user_id, guild_id, and channel_id
      // This way the user/guild/channel will be maintained until the tab is closed, even if you refresh
      // Session storage will generate new unique mocks for each tab you open
      // Any of these values can be overridden via query parameters
      // i.e. if you set https://my-tunnel-url.com/?user_id=test_user_id
      // this will override this will override the session user_id value
      const mockUserId = getOverrideOrRandomSessionValue("user_id");
      const mockGuildId = getOverrideOrRandomSessionValue("guild_id");
      const mockChannelId = getOverrideOrRandomSessionValue("channel_id");

      const newDiscordSdk = new DiscordSDKMock(
        env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
        mockGuildId,
        mockChannelId,
      );
      const discriminator = String(mockUserId.charCodeAt(0) % 5);

      newDiscordSdk._updateCommandMocks({
        authenticate: async () => {
          return {
            access_token: "mock_token",
            user: {
              username: mockUserId,
              discriminator,
              id: mockUserId,
              avatar: null,
              public_flags: 1,
            },
            scopes: [],
            expires: new Date(2112, 1, 1).toString(),
            application: {
              description: "mock_app_description",
              icon: "mock_app_icon",
              id: "mock_app_id",
              name: "mock_app_name",
            },
          };
        },
      });

      setDiscordSdk(newDiscordSdk);
    }
  }, []);

  return { discordSdk, isMock };
};
