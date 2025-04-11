// packages
import express from "express";
import dotenv from "dotenv"; //(3ndi brk)
import cors from "cors";

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

app.listen(port, () => {
  connect_To_mongoDB();
  console.log("server started at http://localhost:" + port);
});
