import express from "express";
import connectDB from "./config/mongodb.js";
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import academicRoutes from './routes/academicRoutes.js'
import facultycourseRoutes from "./routes/facultycourseRoutes.js"

const PORT =  process.env.PORT || 4000;
const app = express ();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/faculty-course", facultycourseRoutes)


await connectDB();

app.get("/", (req,res) => {res.send("Api working")});

app.listen(PORT, ()=>{console.log(`server is live on port ${PORT}`)});