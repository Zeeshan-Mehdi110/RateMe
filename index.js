require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoutes = require("./controllers/users")
const departmentRoutes = require("./controllers/department")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/departments",departmentRoutes)



mongoose.connect(process.env.MONGOODB_CONNECTION_URL).then(() => {
  console.log("database connected successfully!!")
}).catch(error => {
  console.log(error)
})

app.listen(5000,() => console.log("server is listening at port 5000"))
