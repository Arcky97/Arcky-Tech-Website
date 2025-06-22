"use client";

import { useEffect, useState } from "react";
import ColorButton from "./ColorButton";
import InputNumber from "./InputNumber";

interface Props {
  user: Record<string, any>;
  name: string;
  settings: any;
  onClose: () => void;
  onSave: (updatedUser: Record<string, any>) => void;
}

export default function UserLevelModifier({ user, name, settings, onClose, onSave }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [userData, setUserData] = useState(user);
  const [initialUserData, setInitialUserData] = useState(user);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    setInitialUserData(user);
    setUserData(user);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user]);

  const handleUserChange = (key: string, value: any) => {
    let xp: any, level: any;
    if (key === "xp") {
      level = getLevelFromXp(value, settings);
      if (level < 0) level = 0 
      xp = value;
    } else if (key === "level") {
      xp = getXpFromLevel(value, settings);
      level = value;
    }
    setUserData((prev) => ({
      ...prev,
      "level": level,
      "xp": xp 
    }));
  };

  const getLevelFromXp = (userXp: any, settings: any) => {
    const initialLevel = 0;
    let totalLevel = initialLevel;
    let xp = getXpFromLevel(totalLevel, settings);
    while (userXp > xp) {
      totalLevel += 1;
      xp = getXpFromLevel(totalLevel, settings);
    }
    return totalLevel - 1;
  }

  const getXpFromLevel = (userLevel: any, settings: any) => {
    const initialXp = 35;
    const incrStep = settings.step;

    let totalXp = initialXp;
    let currIncr = incrStep / 2;
    let level = 0;
    if (userLevel > 0) {
      while (level < userLevel - 1) {
        totalXp += currIncr;
        currIncr += incrStep;
        level++;
      }
    }
    return totalXp;
  }

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleSave = () => {
    onSave(userData);
    closeModal();
  };

  const handleReset = () => {
    setUserData(initialUserData);
  };

  return (
    <>
      <div className={`fixed inset-0 z-149 backdrop-blur-xl bg-tint-base/4 transition-opacity duration-300 ${isVisible && !isClosing ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`fixed inset-0 transition-all duration-300 ease-in-out flex justify-center z-150 items-center ${isVisible && !isClosing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'}`}>
        <div className="bg-gray-800 rounded-lg shadow-lg  flex h-auto">
          <div>
            <header className="flex justify-between items-center px-6 py-4 bg-gray-800 sticky top-0 z-10 w-full space-x-5">
              <h2 className="text-white text-xl font-bold">
                Edit User: {name}
              </h2>
              <ColorButton
                color="red"
                text="Close"
                action={closeModal}
              />
            </header>
            <div className="overlow-y-auto px-6 pb-6 space-y-4">
              <InputNumber
                label="User Level:"
                min={1}
                max={999}
                step={1}
                value={userData.level}
                placeholder="Modify User's level"
                onChange={(val) => handleUserChange("level", val)}
                className="w-full mb-4"
              />
              <InputNumber
                label="User XP:"
                min={1}
                max={99999}
                step={1}
                value={userData.xp}
                placeholder="Modify User's xp"
                onChange={(val) => handleUserChange("xp", val)}
                className="w-full mb-4"
              />
              <div className="justify-center space-x-2">
                <ColorButton
                  color="blue"
                  text="Save"
                  action={handleSave}
                />
                <ColorButton
                  color="red"
                  text="Reset"
                  action={handleReset}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}