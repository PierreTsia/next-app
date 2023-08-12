import Image from "next/image";

export const TaskCheckbox = ({
  isCompleted,
  toggle,
}: {
  isCompleted: boolean;
  toggle: () => void;
}) => {
  return (
    <span
      onClick={toggle}
      className={`flex items-center justify-center rounded-full w-[1.6em] h-[1.6em] border border-borderColor mx-4 ${
        isCompleted
          ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
          : "bg-bgContent"
      }`}
    >
      {isCompleted && (
        <Image
          className={"pt-0.5"}
          src={"/icon-check.svg"}
          alt={"check task icon"}
          width={12}
          height={12}
        />
      )}
    </span>
  );
};
