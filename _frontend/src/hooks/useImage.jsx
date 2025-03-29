import axios from "axios";

export const useUploadImage = () => {
  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("image", img);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=cc3cc12794e67eef7d4c2126b9bb3966`,
      formData
    );
    return res.data.data.url;
  };
  return { uploadImage };
};
