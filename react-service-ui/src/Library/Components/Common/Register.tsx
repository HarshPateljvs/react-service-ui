import { AVTUseState } from "../../../Library/customHooks";
import CommonInput from "../Form/CommonInput";
import CommonButton from "../Form/CommonButton";
import { API } from "../../../Library/services/API/api";
import { AuthAPI } from "../../../URLS/Masters";
import { ToastService } from "../../services/toastService";
import { UserRole } from "../../../Components/Routes/UserRole";
import CommonEnumDropdown from "../Form/CommonEnumDropdown";

const Register = ({ onBack }: { onBack: () => void }) => {
  const [firstName, setFirstName] = AVTUseState("reg_first_name", "");
  const [lastName, setLastName] = AVTUseState("reg_last_name", "");
  const [email, setEmail] = AVTUseState("reg_email", "");
  const [phone, setPhone] = AVTUseState("reg_phone", "");
  const [password, setPassword] = AVTUseState("reg_password", "");
  const [confirmPassword, setConfirmPassword] = AVTUseState(
    "reg_confirm_password",
    ""
  );
  const [validate, setValidate] = AVTUseState("reg_validate", false);
  const [roleId, setRoleId] = AVTUseState<number>(
    "reg_role_id",
    UserRole.Admin
  ); // Default to Student

  const handleRegister = async () => {
    setValidate(true);
    if (password !== confirmPassword) {
      ToastService.INFO("Passwords do not match");
      return;
    }

    const response = await API.POST<AppUser>(AuthAPI.REGISTER, {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      PhoneNumber: phone,
      Password: password,
      RoleId : roleId
    });
    if (response) {
      onBack();
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommonInput
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonInput
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonInput
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonInput
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonInput
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonInput
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          validateTrigger={validate}
        />
        <CommonEnumDropdown
          label="Select Role"
          value={roleId}
          onChange={(val) => setRoleId(Number(val))}
          enumObject={UserRole}
        />
      </div>

      <CommonButton onClick={handleRegister}>Register</CommonButton>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <span className="text-blue-600 cursor-pointer" onClick={onBack}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
