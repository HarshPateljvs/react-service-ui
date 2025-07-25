// services/fileService.ts
import axios from 'axios';
import { BaseURL } from '../../../Library/services/API/baseURL';

export const uploadFile = async (file: File, folder: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  try {
    const response = await axios.post(`${BaseURL.REACTSERVICE}File/Upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // contains APIBaseResponse<FileUploadResponseDto>
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
