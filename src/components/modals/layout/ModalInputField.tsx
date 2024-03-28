import React from "react";

// Props
interface ModalInputFieldProps {
  placeHolder: string;
  id: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const ModalInputField: React.FC<ModalInputFieldProps> = ({
  placeHolder,
  id,
  label,
  value,
  setValue,
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
    </div>
  );
};

export default ModalInputField;
