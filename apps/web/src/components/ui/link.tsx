"use client";

import NextLink, { LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, HTMLProps } from "react";

export const DISCORD_PARAMS = [
  "instance_id",
  "channel_id",
  "location_id",
  "launch_id",
  "guild_id",
  "frame_id",
  "platform",
] as const;

export const Link: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = (props) => {
  const currentSearchParams = useSearchParams();

  const { href } = props;

  // Get the search params from the link element
  const hrefPathname = href.split("?")[0];
  const hrefSearchParams = new URLSearchParams(href.split("?")[1]);

  // Add the Discord search params from currentSearchParams to the hrefSearchParams
  DISCORD_PARAMS.forEach((param) => {
    if (currentSearchParams.has(param)) {
      hrefSearchParams.set(param, currentSearchParams.get(param) as string);
    }
  });

  // Set the search params on the href
  const newHref = `${hrefPathname}?${hrefSearchParams.toString()}`;

  return <NextLink suppressHydrationWarning {...props} href={newHref} />;
};
