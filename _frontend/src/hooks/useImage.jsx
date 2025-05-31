import axios from "axios";

export const useUploadImage = () => {
  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("image", img);

    try {
      const res = await axios.post("api/upload-image", formData);
      return res.data.image?.url;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { uploadImage };
};
