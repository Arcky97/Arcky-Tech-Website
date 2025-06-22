"use client";

import ColorButton from "./ColorButton";

interface Props {
  hasChanges: boolean;
  onSave: () => void;
  onReset: () => void;
}

export default function DashboardButtons({ hasChanges, onSave, onReset }: Props) {
  return (
    <div className={`${
      hasChanges ? "translate-y-0 opacity-95" : "translate-y-30 opacity-0"
    } z-20 fixed bottom-8 w-full flex justify-center text-md lg:text-lg transition-all duration-300 ease-in-out`}>
      <div
        className="flex gap-4 bg-blue-800 p-2 lg:p-3 rounded-lg transition-all duration-300 ease-in-out"
      >
        <p className="items-center font-bold px-4 py-2">Changes Detected</p>
        <ColorButton
          color="blue"
          text="Save Changes"
          action={onSave}
        />
        <ColorButton
          color="red"
          text="Reset Changes"
          action={onReset}
        />
      </div>
    </div>
  );
}
