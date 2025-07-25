import React, { useState } from "react";
import { uploadFile } from "./fileService";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const response = await uploadFile(selectedFile, "Employee");
      console.log("Upload successful:", response);
      if (response != null) {
        console.log(response.Data);
        setImage(response.Data.ImageProp.OriginalImageURL);
      }
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <img src={image} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploadComponent;
