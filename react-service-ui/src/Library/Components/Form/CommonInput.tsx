// src/Library/Components/Common/Form/CommonInput.tsx
import React from "react";
import TextField from "@mui/material/TextField";

type CommonInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  validateTrigger?: boolean; // 🔍 trigger validation externally
};

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  validateTrigger = false,
}) => {
  const hasError = required && validateTrigger && !value.trim();
  const formattedLabel = placeholder || name;

  return (
    <TextField
      fullWidth
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={formattedLabel}
      label={formattedLabel}
      variant="outlined"
      size="small"
      margin="normal"
      error={hasError}
      helperText={hasError ? `${formattedLabel} is required` : ""}
      autoComplete="off"
    />
  );
};

export default CommonInput;
