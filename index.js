const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user")
const bodyParser = require("body-parser");
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hello.html"));
});

app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use("/api/user",userRoute);


app.listen(PORT, () => {
  console.log(`Server is Listening on PORT : ${PORT}`);
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Mongo db Connected");
    })
    .catch((error) => {
      console.log(error);
    });
});
