const express = require("express");
const bodyParser = require("body-parser");
const ip = require("ip");

const phaseRoute = require("./routes/phase.js");
const customerRoute = require("./routes/customer.js");
const userRoute = require("./routes/users.js");
const rolesRoute = require("./routes/roles.js");
const groupRoute = require("./routes/groups.js");
const memorialRoute = require("./routes/memoriallot.js");
const dealsRoute = require("./routes/deals.js");
const instsRoute = require("./routes/installment.js");
const logRoute = require("./routes/logs.js");
const paymentRoute = require("./routes/payment.js");
const bonecryptRoute = require("./routes/bonecrypt.js");
const lawnRoute = require("./routes/lawn.js");
const apartmentRoute = require("./routes/apartment.js");
const tempalteRoute = require("./routes/template.js");
const customviewRoute = require("./routes/customview.js");
const orRoute = require("./routes/or.js");
const constructionRoute = require("./routes/construction.js");
const miscellaneousRoute = require("./routes/miscellaneous.js");
const deceasedRoute = require("./routes/deceased.js");
const checkRoute = require("./routes/checker.js");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/phase", phaseRoute);
app.use("/users", userRoute);
app.use("/customer", customerRoute);
app.use("/roles", rolesRoute);
app.use("/groups", groupRoute);
app.use("/memoriallot", memorialRoute);
app.use("/deals", dealsRoute);
app.use("/installment", instsRoute);
app.use("/logs", logRoute);
app.use("/payment", paymentRoute);
app.use("/bonecrypt", bonecryptRoute);
app.use("/lawn", lawnRoute);
app.use("/apartment", apartmentRoute);
app.use("/template", tempalteRoute);
app.use("/view", customviewRoute);
app.use("/or", orRoute);
app.use("/construction", constructionRoute);
app.use("/miscellaneous", miscellaneousRoute);
app.use("/deceased", deceasedRoute);
app.use("/check", checkRoute);

const PORT = parseInt(process.env.S_PORT);
const HOST = process.env.HOST;

app.get("/", (req, res) => {
  res.redirect("https://www.google.com/");
});
let host = ip.address();
app.listen(PORT, HOST, () =>
  console.log(`Server Running http://${HOST}:${PORT}`)
);
