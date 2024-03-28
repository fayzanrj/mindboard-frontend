"use client";
import React, { useState } from "react";
import { MdSettings } from "react-icons/md";
import SettingsModal from "../modals/SettingsModal";
import SettingProps from "@/props/SettingProps";

// Props
interface SettingButtonProps {
  settings: SettingProps;
  setSettings: React.Dispatch<React.SetStateAction<SettingProps>>;
}

const Settings: React.FC<SettingButtonProps> = ({ setSettings, settings }) => {
  // States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Function to toggle settings modal
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <>
      {isSettingsOpen && (
        <SettingsModal
          closeSettings={toggleSettings}
          settings={settings}
          setSettings={setSettings}
        />
      )}
      <button
        onClick={toggleSettings}
        className="w-11 ml-1 h-11 bg-white shadow-lg rounded-md drop-shadow inline align-top"
      >
        <MdSettings size={"1.5rem"} className="mx-auto" />
      </button>
    </>
  );
};

export default Settings;
