import { ToggleThemeButton } from "./toggle-theme-button";

export const Topbar = () => {
  return (
    <div className="flex items-center justify-between border-b px-3 py-1">
      <div className="text-sm font-semibold">
        Django Discord Nextjs Todo Example
      </div>
      <div className="flex justify-end">
        <ToggleThemeButton />
      </div>
    </div>
  );
};
