import { ReactNode } from "react";

export const _BaseCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-6 bg-bgContent rounded-md shadow-md lg:max-w-xl">
      {children}
    </div>
  );
};
