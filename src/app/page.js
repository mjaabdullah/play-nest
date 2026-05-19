import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <ThemeToggle />
      <h1 className="text-3xl dark:text-white font-bold text-center">
        Hello world!
      </h1>
    </div>
  );
}
