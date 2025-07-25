import { useState } from "react";
import CommonButton from "../../../Library/Components/Form/CommonButton";
import CommonInput from "../../../Library/Components/Form/CommonInput";
import CommonImageUpload from "../../../Library/Components/Form/ImageUploder/CommonImageUpload";

const AddEmployee = ({
  employee,
  setEmployee,
  onSave,
  onCancel,
  validate,
  loading,
}: {
  employee: Partial<Employee>;
  setEmployee: (e: Partial<Employee>) => void;
  onSave: () => void;
  onCancel: () => void;
  validate?: boolean;
  loading?: boolean;
}) => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="p-6 border rounded shadow bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CommonInput
          name="name"
          placeholder="Name"
          value={employee.Name || ""}
          onChange={(e) => setEmployee({ ...employee, Name: e.target.value })}
          validateTrigger={validate}
          required
        />
        <CommonInput
          name="email"
          placeholder="Email"
          value={employee.Email || ""}
          onChange={(e) => setEmployee({ ...employee, Email: e.target.value })}
          validateTrigger={validate}
          required
        />
        <CommonInput
          name="department"
          placeholder="Department"
          value={employee.Department || ""}
          onChange={(e) =>
            setEmployee({ ...employee, Department: e.target.value })
          }
          validateTrigger={validate}
          required
        />
        <CommonInput
          name="role"
          placeholder="Role"
          value={employee.Role || ""}
          onChange={(e) => setEmployee({ ...employee, Role: e.target.value })}
          validateTrigger={validate}
          required
        />
        <CommonImageUpload
          onChange={(imgRequest) =>
            setEmployee({ ...employee, EmployeeImages: imgRequest })
          }
          isMulti={true}
          isCropEnable={true}
          Folder="Employee"
        />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CommonButton variant="outlined" onClick={onCancel}>
          Cancel
        </CommonButton>
        <CommonButton onClick={onSave} loading={loading}>
          Save
        </CommonButton>
      </div>
    </div>
  );
};

export default AddEmployee;
