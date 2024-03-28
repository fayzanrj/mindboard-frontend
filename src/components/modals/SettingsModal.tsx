import React from "react";
import ModalLayout from "./layout/ModalLayout";
import SettingProps from "@/props/SettingProps";

// Props
interface SettingsModalProps {
  closeSettings: () => void;
  settings: SettingProps;
  setSettings: React.Dispatch<React.SetStateAction<SettingProps>>;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  closeSettings,
  settings,
  setSettings,
}) => {
  return (
    <ModalLayout
      heading="Settings"
      closeModal={closeSettings}
      isLoading={false}
    >
      <div className="py-10 px-4">
        {/* Participants */}
        <SettingItem
          heading="Participants"
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              showParticpants: !prev.showParticpants,
            }))
          }
          checked={settings.showParticpants}
          peerClass="peer-participants"
        />

        {/* Toolbar */}
        <SettingItem
          heading="Toolbar"
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              showToolBar: !prev.showToolBar,
            }))
          }
          checked={settings.showToolBar}
          peerClass="peer-toolbar"
        />

        {/* Board */}
        <SettingItem
          heading="Board Name"
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              showBoardInfo: !prev.showBoardInfo,
            }))
          }
          checked={settings.showBoardInfo}
          peerClass="peer-toolbar"
        />

        {/* Grag buttons */}
        <SettingItem
          heading="Drag Buttons"
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              showScreenButtons: !prev.showScreenButtons,
            }))
          }
          checked={settings.showScreenButtons}
          peerClass="peer-movebuttons"
        />
      </div>
    </ModalLayout>
  );
};

export default SettingsModal;

interface SettingItemProps {
  onClick: () => void;
  heading: string;
  checked: boolean;
  peerClass: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  heading,
  onClick,
  checked,
  peerClass,
}) => {
  return (
    <div className="my-3 flex items-center justify-between w-full">
      <p>{heading}</p>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className={`sr-only ${peerClass}`}
          onChange={onClick}
          checked={checked}
        />
        <div
          className={`relative w-[2.9rem] h-6 bg-gray-200 rounded-full border border-gray-300 ${
            checked ? "bg-green-500" : ""
          }`}
        >
          <div
            className={`absolute left-0.5 top-[0.075rem] w-5 h-5 bg-white rounded-full transition duration-500 ${
              checked ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};
