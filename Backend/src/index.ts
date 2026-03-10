import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/Auth";
import cors from "cors";
import jobPostRouter from "./routes/JobPost";
import { openDb } from "./db";
import assignedJobRouter from "./routes/AssignedJob";
import milestoneRouter from "./routes/Milestone";
import { jobApplicationRouter } from "./routes/JobApplication";
import milestoneUpdateRouter from "./routes/MilestoneUpdate";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/auth", authRouter);

app.use("/jobPost", jobPostRouter);

app.use("/assignedJob", assignedJobRouter)

app.use("/milestone", milestoneRouter)

app.use("/jobApplication", jobApplicationRouter)

app.use("/milestoneUpdate", milestoneUpdateRouter)

// app.get("/", async (req, res) => {
//   try {
//     const db = await openDb();

//     await db.run(
//       `INSERT INTO users (name, email) VALUES (?, ?)`,
//       ["test", "test@gmail.com"]
//     );

//     // Retrieve all users
//     const users = await db.all(`SELECT * FROM users`);

//     res.json({
//       success: true,
//       data: users,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// });

// app.get("/protected/freelancer", authenticate, authorize(["freelancer"]), (req: Request, res: Response) => {
//   res.json({
//     data: "Protected Data",
//     user: req.user})
// })

// app.get("/protected/employer", authenticate, authorize(["employer"]), (req: Request, res: Response) => {
//   res.json({
//     data: "Protected Data",
//     user: req.user})
// })

const query = async () => {
  const db = await openDb();
  // console.table( await db.all(`
  //     SELECT 
  //     m.id AS milestoneId, m.jobPostId, m.assignedJobId, m.description AS milestoneDescription, m.deadline AS milestoneDeadline, 
  //     m.payment AS milestonePayment,
  //     aj.id, aj.employerId, aj.freelancerId, aj.description, aj.deadline, aj.payment, aj.status, aj.createdAt
  //     FROM milestones m  
  //     LEFT JOIN assigned_jobs aj
  //     ON m.assignedJobId = aj.id
  //   `))

  
console.table( await db.all(`
      SELECT 
      *
      FROM milestone_updates mu
      LEFT JOIN milestones m
      ON m.id = mu.milestoneId
    `))
}

// query();

app.listen(PORT, () => {
  console.log(`🚀 server refresh http://localhost:${PORT}`);
});