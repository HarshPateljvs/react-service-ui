import CommonGrid from "../../../Library/Components/Form/CommonGrid";
import { UserAPI } from "../../../URLS/Masters";

const UserList = () => {
  return (
    <CommonGrid<User>
      apiUrl={UserAPI.GET_ALL}
      updateUrl={UserAPI.UPDATE}
      showDelete
    />
  );
};
export default UserList;
