import { TodoBox } from "./to-do-box";

export default function HomePage() {
  return (
    <main className="flex h-full grow flex-col items-center justify-center">
      <TodoBox />
    </main>
  );
}
