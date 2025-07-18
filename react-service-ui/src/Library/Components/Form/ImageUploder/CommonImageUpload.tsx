import { AVTUseState } from "../../../customHooks";
import CommonButton from "../CommonButton";
import ImageUploadGrid from "./ImageUploadGrid";

const CommonImageUpload = () => {
  const [show, setShow] = AVTUseState("CommonImageUploadshow", false);
  const handleOpen = () => {
    setShow(true);
  };
  return (
    <>
      <CommonButton variant="contained" onClick={handleOpen}>
        Upload Image
      </CommonButton>
      {show && <ImageUploadGrid />}
    </>
  );
};

export default CommonImageUpload;
