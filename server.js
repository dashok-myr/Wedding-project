const db = require("./firebase_config");
const firebase = require("firebase");
const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/rsvp", (req, res) => {
  const { firstName, lastName, email, plusGuests, password } = req.body;

  if (password === process.env.PASSWORD) {
    saveGuest(firstName, lastName, email, plusGuests);
    res.json({
      isSuccess: true
    });
  } else {
    res.json({
      isSuccess: false
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
//Save message to firebase
const saveGuest = (firstName, lastName, email, plusGuests) => {
  const now = new Date();

  const rsvp = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    plusGuests: plusGuests,
    createdAt: firebase.firestore.Timestamp.fromDate(now)
  };

  db.collection("rsvp")
    .add(rsvp)
    .then(() => {
      console.log(`${firstName} added to firebase`);
    })
    .catch(error => {
      console.log(error);
    });
};
