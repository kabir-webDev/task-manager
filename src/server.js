import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as v1UserRouter } from "./v1/routes/userRoutes.js";
import authRoutes from './v1/routes/authRoutes.js';
import taskRoutes from './v1/routes/taskRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
// mongoose.connect("mongodb://localhost:27017/task-manager").then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB: ', error);
// });

const DB_URL = "mongodb+srv://kabir_hasan:DITSMg3164D4OLX3@cluster0.l3ebd.mongodb.net/task-manager?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e) => {
    console.log("Error: ", e);
  });

app.use("/api/v1/users", authMiddleware.authMiddleware, v1UserRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", authMiddleware.authMiddleware, taskRoutes);
app.get('/', (req, res) => {
  res.send('<h1>Cool Things are comeing Sooner!</h1>');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    }
);