// packages
import express from "express";
import dotenv from "dotenv"; //(3ndi brk)
import cors from "cors";
import fileUpload from "express-fileupload";
import axios from "axios";
import FormData from "form-data";

// utiles
import { connect_To_mongoDB } from "./configs/database.js";
import customerRouter from "./routes/customer.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import authRouter from "./routes/auth.routes.js";
import platesRoutes from "./routes/plates.routes.js";
import orderRouter from "./routes/orders.routes.js";

const app = express();
dotenv.config(); // bah na9dro njibo mn .env file
const port = process.env.PORT || 1000; // jebt el port mn .env file

app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(cors()); // bah n9dro nb3tho requests mn FRONTEND

app.use("/api/customer", customerRouter);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/plates", platesRoutes);
app.use("/api/auth", authRouter);
app.use("/api/orders", orderRouter);
app.use(fileUpload());

app.post("/api/upload-image", async (req, res) => {
  try {
    const file = req.files.image;

    //FreeImage.host
    const form = new FormData();
    form.append("source", file.data, file.name);
    form.append("action", "upload");
    form.append("type", "file");

    const response = await axios.post(
      `https://freeimage.host/api/1/upload?key=${process.env.IMG_HOST_kEY}`,
      form,
      { headers: form.getHeaders() }
    );

    return res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Image upload failed" });
  }
});


app.listen(port, () => {
  connect_To_mongoDB();
  console.log("server started at http://localhost:" + port);
});
