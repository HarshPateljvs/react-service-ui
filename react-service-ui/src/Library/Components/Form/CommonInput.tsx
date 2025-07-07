// src/Library/Components/Common/Form/CommonInput.tsx
import React from "react";
import TextField from "@mui/material/TextField";
import { ToastService } from "../../services/toastService";
import { AVTUseState } from "../../customHooks";

type CommonInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}) => {
  const [touched, setTouched] = AVTUseState("CommonInput ->" + name, false);

  const handleBlur = () => {
    setTouched(true);
    if (required && !value.trim()) {
      ToastService.INFO(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    }
  };

  return (
    <TextField
      fullWidth
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      label={placeholder}
      variant="outlined"
      size="small"
      margin="normal"
    />
  );
};

export default CommonInput;
