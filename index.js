// Require express and body-parser
const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
// Initialize express and define a port
const app = express();
const PORT = 3344;
// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
app.get("/back", async (req, res) => {
  const { commandText } = req.query;
  console.log(req.query);
  await exec(`bash apidev.sh`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.send("some error happened: 😭");
    }

    return res.status(200).send("ok");
  });
});
app.get("/front", async (req, res) => {
  const { commandText } = req.query;
  console.log(req.query);
  await exec(`bash front.sh`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.send("some error happened: 😭");
    }

    return res.status(200).send("ok");
  });
});
app.get("/", (req, res) => {
  console.log("corriendo"); // Call your action on the request here
  //res.status(200).end(); // Responding is important
});
app.post("/hook", (req, res) => {
  console.log(req.body); // Call your action on the request here
  res.status(200).end(); // Responding is important
});
// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
