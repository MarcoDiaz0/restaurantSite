import fileUpload from "express-fileupload";
import axios from "axios";
import FormData from "form-data";


const app = express();

app.use(cors());
app.use(fileUpload());

app.post("/api/upload-image", async (req, res) => {
  try {
    const file = req.files.image;

    // تجهيز البيانات لإرسالها إلى FreeImage.host
    const form = new FormData();
    form.append("source", file.data, file.name);
    form.append("action", "upload");
    form.append("type", "file");

    const response = await axios.post(
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
      form,
      { headers: form.getHeaders() }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Image upload failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
