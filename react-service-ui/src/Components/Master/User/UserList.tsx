import { AVTUseEffect, AVTUseState } from "../../../Library/customHooks";
import { API } from "../../../Library/services/API/api";
import { UserAPI } from "../../../URLS/Masters";

const UserList = () => {
   const [users, setUsers] = AVTUseState<User[]>("UserList", []);
// const user: User = {
//   Id: 0,
//   Name: "",
//   Email: "",
//   PhoneNumber: "",
//   Password: "",
//   DateOfBirth: '1998-05-01T00:00:00Z',
//   Address:"",
// };
  const loadUsers = async () => {
    const result = await API.GET<User[]>(UserAPI.GET_ALL);
    //await API.POST<User>(UserAPI.CREATE,user)
    setUsers(result);
  };

  AVTUseEffect(
    "UserList - Initial Load",
    () => {
      loadUsers();
    },
    []
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.Id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{user.Name}</h3>
              <p className="text-sm text-gray-600">📧 {user.Email}</p>
              <p className="text-sm text-gray-600">📞 {user.PhoneNumber}</p>
              <p className="text-sm text-gray-600">
                🎂 {new Date(user.DateOfBirth).toLocaleDateString()}
              </p>
              {user.Address && (
                <p className="text-sm text-gray-600">🏠 {user.Address}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
