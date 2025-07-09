import CommonGrid from "../../../Library/Components/Form/CommonGrid";
import { EmployeeAPI } from "../../../URLS/Masters";

export default function EmployeeList() {
  return (
    <CommonGrid<Employee>
      apiUrl={EmployeeAPI.GET_ALL}
      updateUrl={EmployeeAPI.UPDATE}
      onEditClick={(user) => console.log("Edit user:", user)}
      onDeleteClick={(user) => console.log("Delete user:", user)}
    />
  );
}
