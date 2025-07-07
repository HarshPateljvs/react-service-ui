import React from "react";
import Button from "@mui/material/Button";

type CommonButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  disabled?: boolean;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  color = "primary",
  variant = "contained",
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ mt: 2 }}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
