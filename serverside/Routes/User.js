const express = require("express");
const app = express();const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
// const crypto = require("crypto");
app.use(bodyParser.urlencoded({ extended: true }));

//user register
app.post("user/register", (req, res) => {
  const { name, email, password, phone_no } = req.body;

  if (!name || !email || !password || !phone_no) {
    return res.status(400).send("All fields are required.");
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    db.query(
      "INSERT INTO users (name, email, password, phone_no) VALUES (?, ?, ?, ?)",
      [name, email, hash, phone_no],
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send("Registration failed.");
        }

        res.send("Registration successful.");
      }
    );
  });
});

//user login

app.post("user/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  db.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password.");
      }

      const user = results[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        if (isMatch) {
          // Passwords match; user is authenticated
          const { id, email } = user;
          res.json({ id, email, message: "Login successful." });
        } else {
          // Passwords do not match
          res.status(401).send("Invalid email or password.");
        }
      });
    }
  );
});

// user page details
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;

  // Query the database to retrieve user details based on the userId
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    const user = results[0];
    // Render the user page and pass the user details to the template
    res.render("user-page", { user });
  });
});

//user update

// Update user information

app.put("/user/:id/update", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    db.query(
      "UPDATE users SET ? WHERE id = ?",
      [updatedUserData, userId],
      err => {
        if (err) {
          console.error(err);
          return res.status(500).send("Update failed.");
        }

        res.send("User updated successfully.");
      }
    );
  });
});

//user delete

app.delete("/user/:id/delete", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    db.query("DELETE FROM users WHERE id = ?", [userId], err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Deletion failed.");
      }

      res.send("User deleted successfully.");
    });
  });
});

//forgot password

