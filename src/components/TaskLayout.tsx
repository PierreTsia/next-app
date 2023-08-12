import { SwitchThemeButton } from "@/src/components/SwitchThemeButton";
import { BackgroundImage } from "@/src/components/BackgroundImage";
import { ReactNode } from "react";

export const TaskLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundImage />
      <div className="w-full text-textColor  justify-center pt-12">
        <div className="max-w-[900px] mx-auto flex justify-between items-center ">
          <h1 className="flex items-center relative top-0.5 p-2 uppercase text-white text-2xl font-bold">
            t o d o
          </h1>
          <SwitchThemeButton />
        </div>
      </div>
      <div className="relative w-[900px] mx-auto mt-8">{children}</div>
    </>
  );
};
