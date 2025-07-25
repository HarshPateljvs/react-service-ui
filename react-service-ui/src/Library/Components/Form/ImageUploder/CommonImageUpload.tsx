import { Box, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CommonImageCropperModal from "./CommonImageCropperModal";
import { AVTUseState } from "../../../customHooks";
import { useRef } from "react";
import CommonButton from "../CommonButton";
import { uploadFile } from "../../../../Components/Master/FileUpload/fileService";

const CommonImageUpload = ({
  isMulti = false,
  isCropEnable = false,
  isShowDelete = true,
  isShowEdit = true,
  onChange,
  Folder = "Employee",
}: ICommonImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = AVTUseState<string[]>("images_state", []);
  const [cropSrc, setCropSrc] = AVTUseState<string | null>("crop_src_state", null);
  const [openCropper, setOpenCropper] = AVTUseState<boolean>("open_cropper_state", false);
  const [editingIndex, setEditingIndex] = AVTUseState<number | null>("editing_index_state", null);
  const [loading, setLoading] = AVTUseState<boolean>("upload_loading_state", false);
  const [cropQueue, setCropQueue] = AVTUseState<string[]>("crop_queue_state", []);

  const getFileName = (url: string) => url.split("__").pop()?.split("/").pop() || "";

  const emitChange = (
    addImages: string[],
    updateImages: { SrNo: number; url: string }[],
    deleteIndices: number[]
  ) => {
    const AddImages: ImageInfo[] = addImages.map((img, i) => ({
      SrNo: i + 1,
      ImageName: getFileName(img),
    }));

    const UpdateImages: ImageInfo[] = updateImages.map((img) => ({
      SrNo: img.SrNo,
      ImageName: getFileName(img.url),
    }));

    const DeleteImages: ImageInfo[] = deleteIndices.map((i) => ({
      SrNo: i + 1,
      ImageName: getFileName(images[i]),
    }));

    const payload: ImageInfoRequest = {
      AddImages,
      UpdateImages,
      DeleteImages,
    } as ImageInfoRequest;

    onChange?.(payload);
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);

    const promises = Array.from(files).map((file) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((imagesBase64) => {
      if (isCropEnable) {
        setCropQueue(imagesBase64);
        setCropSrc(imagesBase64[0]);
        setEditingIndex(null);
        setOpenCropper(true);
      } else {
        Array.from(files).forEach(async (file) => {
          const res = await uploadFile(file, Folder);
          const url = res?.Data?.ImageProp?.OriginalImageURL;
          if (url) {
            const updatedImages = isMulti ? [...images, url] : [url];
            setImages(updatedImages);
            emitChange(updatedImages, [], []);
          }
        });
      }

      setLoading(false);
    });
  };

  const handleUploadCroppedImage = async (base64Img: string) => {
    const blob = await (await fetch(base64Img)).blob();
    const file = new File([blob], `cropped-${Date.now()}.png`, { type: "image/png" });

    const res = await uploadFile(file, Folder);
    const url = res?.Data?.ImageProp?.OriginalImageURL;
    return url;
  };


  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    emitChange(updated, [], [index]);
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSelectFile}
        hidden
        multiple={isMulti}
      />
      <CommonButton
        onClick={() => fileInputRef.current?.click()}
        loading={loading}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </CommonButton>

      <Box sx={{ display: "flex", gap: 2, overflowX: "auto", paddingY: 1 }}>
        {images.map((img, index) => (
          <Box
            key={img + index}
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              flexShrink: 0,
              border: "1px solid #ccc",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <img
              src={img}
              alt={`preview-${index}`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
            {isShowDelete && (
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
            {isShowEdit && (
              <IconButton
                size="small"
                onClick={() => {
                  setCropSrc(img);
                  setEditingIndex(index);
                  setOpenCropper(true);
                }}
                sx={{ position: "absolute", bottom: 0, right: 0 }}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      <CommonImageCropperModal
        open={openCropper}
        imgSrc={cropSrc}
        onClose={() => {
          setOpenCropper(false);
          setEditingIndex(null);
          setCropQueue([]);
        }}
        onSave={async (croppedImg) => {
          const uploadedUrl = await handleUploadCroppedImage(croppedImg);
          if (!uploadedUrl) return;

          const updatedImages = [...images];
          const updated: { SrNo: number; url: string }[] = [];

          if (editingIndex !== null) {
            updatedImages[editingIndex] = uploadedUrl;
            updated.push({ SrNo: editingIndex + 1, url: uploadedUrl });
            setEditingIndex(null);
          } else {
            updatedImages.push(uploadedUrl);
          }

          setImages(updatedImages);
          emitChange(updatedImages, updated, []);

          const [, ...remainingQueue] = cropQueue;
          if (remainingQueue.length > 0) {
            setCropQueue(remainingQueue);
            setCropSrc(remainingQueue[0]);
            setOpenCropper(true);
          } else {
            setCropQueue([]);
            setOpenCropper(false);
          }
        }}
      />
    </Box>
  );
};

export default CommonImageUpload;