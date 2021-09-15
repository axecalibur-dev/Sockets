const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  console.log("A user has connected");

  // Send event / message to Client
  setInterval(function () {
    socket.emit("testerEvent", {
      description: "A custom event named testerEvent!",
    });
  }, 4000);

  socket.on("clientEvent", function (data) {
    console.log(data);
  });

  socket.on("disconnect", function () {
    console.log("A user has disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on localhost:3000");
});
