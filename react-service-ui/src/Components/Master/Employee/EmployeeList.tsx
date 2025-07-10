import CommonGrid from "../../../Library/Components/Form/CommonGrid";
import { AVTUseState } from "../../../Library/customHooks";
import { API } from "../../../Library/services/API/api";
import { EmployeeAPI } from "../../../URLS/Masters";
import AddEmployee from "./AddEmployee";

export default function EmployeeList() {
  const [showAddForm, setShowAddForm] = AVTUseState("add_form_visible", false);
  const [newEmp, setNewEmp] = AVTUseState<Partial<Employee>>("new_emp", {});
  const [validate, setValidate] = AVTUseState("grid_validate", false);
  const [loading, setLoading] = AVTUseState("add_loading", false);
  const [reload, setReload] = AVTUseState("grid_reload_counter", 0);
  const handleAdd = async () => {
    setValidate(true);
    if (!newEmp.Name || !newEmp.Email || !newEmp.Department || !newEmp.Role)
      return;
    setLoading(true);
    const response = await API.POST<Employee>(EmployeeAPI.CREATE, newEmp);
    setLoading(false);
    if (response) {
      setNewEmp({});
      setShowAddForm(false);
      setReload(reload + 1);
    }
  };

  return (
    <>
      {showAddForm && (
        <AddEmployee
          employee={newEmp}
          setEmployee={setNewEmp}
          onSave={handleAdd}
          onCancel={() => setShowAddForm(false)}
          validate={validate}
          loading={loading}
        />
      )}
      <CommonGrid<Employee>
        apiUrl={EmployeeAPI.GET_ALL}
        updateUrl={EmployeeAPI.UPDATE}
        deleteUrl={EmployeeAPI.DELETE}
        onEditClick={(user) => console.log("Edit user:", user)}
        onDeleteClick={(user) => console.log("Delete user:", user)}
        onAddClick={() => setShowAddForm(true)}
        showDelete
        reloadTrigger={reload}
      />
    
    </>
  );
}
