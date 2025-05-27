import axios from "axios";

export const useUploadImage = () => {
  const uploadImage = async (img) => {
    const formData = new FormData();
    formData.append("image", img); // الصورة من input
    
    try {
      const res = await axios.post(
        "api/upload-image",
        formData
      );
      console.log("رابط الصورة:", res.data.image?.url);
      return res.data.image?.url;
    } catch (err) {
      console.error("فشل رفع الصورة:", err);
      return null;
    }
  };

  return { uploadImage };
};
