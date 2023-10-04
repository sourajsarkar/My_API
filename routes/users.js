const express = require("express");
const User = require("../models/db");
const router = express.Router();

// GET /users
// router.get("/", (req, res) => {
//   res.send("Get all users");
// });

// GET /users
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Error getting users" });
    });
});

// POST /users
router.post("/add", (req, res) => {
  const user = req.body;

  // Create a new user
  const newUser = new User(user);

  // Save the user to the database
  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    });
});

// router.post("/add", async(req, res) => {
//   try {
//     const user = req.body;
//     const newUser = new User(user);
//     await newUser.save()
//       .then((user) => {
//         res.json(user);
//       })

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({error})

//   }

// })

//Delete
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  // Find user by ID and remove
  User.findByIdAndRemove(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" });
    });
});

// PUT /users/:id
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  // Find user by ID and update
  User.findByIdAndUpdate(userId, updatedUser, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user" });
    });
});

//GET SINGLE DATA
router.get("/:id", async (req, res) => {
  try {
    const indiv = req.params.id;
    const userid = await User.findById(indiv);
    res.json(userid);
  } catch (e) {
    res.status(404).json({ e });
  }
});

//update
router.patch("/:id", async (req, res) => {
  try {
    const indiv = req.params.id;
    const updatedUser = req.body;
    const userid = await User.findByIdandUpdate(indiv, updatedUser, {
      new: true,
    });
    res.json(userid);
  } catch (e) {
    res.status(500).json({ e });
  }
});
// DELETE /users/:id
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send(`Delete user with ID ${deletedUser}`);
  } catch (e) {
    res.status(500).json({ e });
  }
});

module.exports = router;
