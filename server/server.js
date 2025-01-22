require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const path = require("path");
const _dirname = path.resolve()

// Enable CORS or handling cors policies
const corsOptions = {
  origin: "https://portfolio-ankit-jaiswal.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  // optionsSuccessStatus: 200, 
  // some browsers (Chrome, Firefox) change status to 204 upon a GET request
  credentials: true,
}
app.use(cors(corsOptions));


// Add middleware to parse JSON request bodies
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

// let's define Admin routes
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

app.use(express.static(path.join(_dirname, "client/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
})
const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});