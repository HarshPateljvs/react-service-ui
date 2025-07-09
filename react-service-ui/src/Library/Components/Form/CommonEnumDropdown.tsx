// components/Form/CommonEnumDropdown.tsx
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

type CommonEnumDropdownProps<T extends Record<string, string | number>> = {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  enumObject: T;
  fullWidth?: boolean;
  disabled?: boolean;
};

function CommonEnumDropdown<T extends Record<string, string | number>>({
  label,
  value,
  onChange,
  enumObject,
  fullWidth = true,
  disabled = false,
}: CommonEnumDropdownProps<T>) {
  return (
    <FormControl fullWidth={fullWidth} disabled={disabled} size="small" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e: SelectChangeEvent<typeof value>) =>
          onChange(typeof value === "number" ? Number(e.target.value) : e.target.value)
        }
      >
        {Object.entries(enumObject).map(([key, val]) => (
          <MenuItem key={val} value={val}>
            {key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CommonEnumDropdown;
