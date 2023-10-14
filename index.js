import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import authRoutes from './routes/authRouter.js'
import categoryRoutes from './routes/categoryRouter.js'
import cors from 'cors'

// dot env config
dotenv.config();
// expres implementation
const app = express();

const PORT = process.env.PORT

connectDb();

// convert to json
app.use(express.json());

// cors configuration
app.use(cors());

// auth routes
app.use("/api/auth/", authRoutes)

// category routes
app.use("/api/category", categoryRoutes)

app.get("/", (req, res)=>{
    res.send("server running...")
})

app.listen(PORT, ()=>console.log("server running at port: "+PORT))