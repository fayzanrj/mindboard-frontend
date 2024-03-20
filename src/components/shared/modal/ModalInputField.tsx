import React from "react";

// Props
interface ModalInputFieldProps {
  placeHolder: string;
  id: string;
  label: "Group slug" | "Group name" | "Board name";
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleAutoGenerate?: () => void;
}

const ModalInputField: React.FC<ModalInputFieldProps> = ({
  placeHolder,
  id,
  label,
  value,
  setValue,
  handleAutoGenerate,
}) => {
  return (
    <div className="w-full my-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <br />
      <input
        id={id}
        className="w-full h-9 px-3 my-1 rounded-lg border"
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />

      {/* Auto generate slug button to generte slug  */}
      {label === "Group slug" && (
        <button
          type="button"
          className="mx-2 text-xs text-blue-700"
          onClick={handleAutoGenerate}
        >
          Auto generate slug
        </button>
      )}
    </div>
  );
};

export default ModalInputField;
