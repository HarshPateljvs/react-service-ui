import CommonButton from "../../../Library/Components/Form/CommonButton";
import CommonInput from "../../../Library/Components/Form/CommonInput";

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
  return (
<div className="grid grid-cols-6 gap-4 items-end p-4 border rounded shadow bg-white">
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
        name="Role"
        placeholder="Role"
        value={employee.Role || ""}
        onChange={(e) =>
          setEmployee({ ...employee, Role: e.target.value })
        }
        validateTrigger={validate}
        required
      />
      <CommonButton className="col-span-1" onClick={onSave} loading={loading}>Save</CommonButton>
      <CommonButton className="col-span-1" variant="outlined" onClick={onCancel}>Cancel</CommonButton>
    </div>
  );
};

export default AddEmployee;
