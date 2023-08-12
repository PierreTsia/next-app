import { LoginCard } from "@/src/components/LoginCard";
import { SwitchThemeButton } from "@/src/components/SwitchThemeButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bgColor text-textColor flex flex-col items-center justify-center">
      <LoginCard />
      <div className={"mt-20 w-[500px] flex justify-center item-center"}>
        <SwitchThemeButton />
      </div>
    </main>
  );
}
