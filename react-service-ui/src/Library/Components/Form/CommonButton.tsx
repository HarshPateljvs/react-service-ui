import React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

type CommonButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  validateBeforeClick?: boolean; // 🔹 Optional validation trigger
  canSubmit?: boolean;
};

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  onClick,
  color = "primary",
  variant = "contained",
  fullWidth = true,
  disabled = false,
  loading = false,
  className,
  validateBeforeClick = false,
  canSubmit = true,
}) => {
  const handleClick = () => {
    if (validateBeforeClick && !canSubmit) return; // ❌ Skip if validation fails
    onClick();
  };
  return (
    <Button
      onClick={handleClick}
      color={color}
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      sx={{ mt: 2 }}
      className={className}
    >
      {loading ? (
        <>
          <CircularProgress
            size={18}
            color="inherit"
            style={{ marginRight: 8 }}
          />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default CommonButton;
