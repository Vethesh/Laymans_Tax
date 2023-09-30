const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./config/Db");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
// const crypto = require("crypto");
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

//routes

//user register
app.post("/user/register", (req, res) => {
  const { name, email, password, phone, type } = req.body;
  console.log(req.body);
  if (!name || !email || !password || !phone || !type) {
    return res.status(400).send("All fields are required.");
  }

  // Check if the user being registered is an admin
  if (type === "admin") {
    // Query the database to see if an admin user already exists
    db.query(
      "SELECT COUNT(*) AS adminCount FROM user WHERE type = 'admin'",
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        const adminCount = results[0].adminCount;
        if (adminCount > 0) {
          return res.status(400).send("An admin user already exists.");
        } else {
          // If no admin exists, proceed with registration
          hashPasswordAndRegister();
        }
      }
    );
  } else {
    // For non-admin users, proceed with registration
    hashPasswordAndRegister();
  }

  // Function to hash the password and perform registration
  function hashPasswordAndRegister() {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      db.query(
        "INSERT INTO user (name, email, password, phone, type) VALUES (?, ?, ?, ?, ?)",
        [name, email, hash, phone, type], // Include usertype in the query
        err => {
          if (err) {
            console.error(err);
            return res.status(500).send("Registration failed.");
          }

          res.send("Registration successful.");
        }
      );
    });
  }
});

//user login

app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  db.query(
    "SELECT id, email, password, type FROM user WHERE email = ?",
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
          const { id, email, type } = user;
          res.json({ id, email, type, message: "Login successful." });
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
  db.query("SELECT * FROM user WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }
    const user = results[0];
    res.status(200).json({ user });
  });
});

//user update

// Update user information

app.put("/user/:id/update", (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  db.query("SELECT * FROM user WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    db.query(
      "UPDATE user SET ? WHERE id = ?",
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

//update password

app.put("/forgot/:email", async (req, res) => {
  const email = req.params.email;
  const { newPassword } = req.body;

  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.query(
      "UPDATE user SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Update failed.");
        }
        if (result.affectedRows === 0) {
          return res.status(404).send("User not found.");
        }
        res.send("Password updated successfully.");
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Password hashing failed.");
  }
});

//user delete

app.delete("/user/:id/delete", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM user WHERE id = ?", [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("User not found.");
    }

    db.query("DELETE FROM user WHERE id = ?", [userId], err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Deletion failed.");
      }

      res.send("User deleted successfully.");
    });
  });
});

//forgot password

//update blog
const formatDate = () => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};

// Endpoint to receive and store the data in the database
app.post("/blog", (req, res) => {
  try {
    const { description } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = formatDate();
    console.log(currentDate, currentTime, req.body);

    // Insert data into the "blog" table
    const query = "INSERT INTO blog (date, time, description) VALUES (?, ?, ?)";

    db.query(query, [currentDate, currentTime, description], (err, results) => {
      if (err) {
        console.error("Error inserting data into :", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({
          message: "Data saved successfully",
          timestamp: currentDate + " " + currentTime,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getblog", (req, res) => {
  try {
    db.query("SELECT * FROM blog", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      // Send the entire table content as an array to the frontend
      res.status(200).json({ data: results });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Problem");
  }
});

//user transaction
const multer = require("multer");
const upload = multer();
//for gst
app.post("/upload/gt", upload.array("files", 20), (req, res) => {
  const files = req.files;
  const { id, name, email, phone, date, service } = req.body;

  // Check if required fields are present
  if (
    !id ||
    !name ||
    !email ||
    !phone ||
    !date ||
    !service ||
    !files ||
    files.length === 0
  ) {
    return res.status(400).send("Missing required fields or files.");
  }

  const fileData = files.map(file => ({
    file_name: file.originalname, // New column for file name
    file_type: file.mimetype,
    file_data: file.buffer,
  }));

  db.query(
    "INSERT INTO gst (id, name, email, phone, date, service, filetype, filecount, filename, filedata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      name,
      email,
      phone,
      date,
      service,
      JSON.stringify(fileData.map(file => file.file_type)),
      files.length,
      JSON.stringify(fileData.map(file => file.file_name)),
      JSON.stringify(fileData.map(file => file.file_data)),
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Transaction creation failed.");
      }

      res.send("Transaction data and files uploaded successfully.");
    }
  );
});

//for itr
app.post("/upload/itr", upload.array("files", 20), (req, res) => {
  const files = req.files;
  const { id, name, email, phone, date, service } = req.body;

  // Check if required fields are present
  if (
    !id ||
    !name ||
    !email ||
    !phone ||
    !date ||
    !service ||
    !files ||
    files.length === 0
  ) {
    return res.status(400).send("Missing required fields or files.");
  }

  const fileData = files.map(file => ({
    file_name: file.originalname, // New column for file name
    file_type: file.mimetype,
    file_data: file.buffer,
  }));

  db.query(
    "INSERT INTO itr (id, name, email, phone, date, service, filetype, filecount, filename, filedata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      id,
      name,
      email,
      phone,
      date,
      service,
      JSON.stringify(fileData.map(file => file.file_type)),
      files.length,
      JSON.stringify(fileData.map(file => file.file_name)),
      JSON.stringify(fileData.map(file => file.file_data)),
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Transaction creation failed.");
      }

      res.send("Transaction data and files uploaded successfully.");
    }
  );
});
//contact page

app.post("/contact", (req, res) => {
  const { name, email, phone, date, query } = req.body;
  console.log(req.body);
  if (!name || !email || !phone || !date || !query) {
    return res.status(400).send("All fields are required.");
  }

  db.query(
    "INSERT INTO contact (name, email,  phone,date, query) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, date, query],
    err => {
      if (err) {
        console.error(err);
        return res.status(500).send("Registration failed.");
      }

      res.status(200).send("submission successful.");
    }
  );
});

//get data for table gst and itr
app.get("/getgst", (req, res) => {
  try {
    db.query(
      "SELECT *, HEX(fileData) AS fileData FROM gst",

      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }

        res.status(200).json({ data: results });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Problem");
  }
});

//for getalll itr
app.get("/getitr", (req, res) => {
  try {
    db.query(
      "SELECT *, HEX(fileData) AS fileData FROM itr",

      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }
        console.log("Query Results:", results);

        res.status(200).json({ data: results });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Problem");
  }
});

//get allusers
app.get("/getallusers", (req, res) => {
  try {
    db.query("SELECT *  FROM user WHERE type!= 'admin'", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      res.status(200).json({ data: results });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Problem");
  }
});

//transaction data
//for gst
app.get("/transaction/gst/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT service, date FROM gst WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).send("Data not found.");
      }

      
      res.json({ data :results});
    }
  );
});

//for itr
app.get("/transaction/itr/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT service, date FROM itr WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).send("Data not found.");
      }

      res.json({ data: results });
    }
  );
});

//connection
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
