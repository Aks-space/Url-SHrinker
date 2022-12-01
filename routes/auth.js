const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { OAuth2Client } = require("google-auth-library");

//@route  GET api/auth
//@desc   Test Route
//@access Public

//to use middleware(protect) add auth as an parameter
router.get("/", auth, async (req, res) => {
  try {
    //get user details
    //-password : dont return the pasword
    const user = await User.findOne({
      email: req.user.email,
    }).select("-password");
    res.json(user);
  } catch {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/googlelogin", (req, res) => {
  const { tokenId } = req.body;

  const client = new OAuth2Client(
    "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com"
  );

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "832304410996-o3j7n3jf6jjj83ajhgsigj4p64ri3ifq.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;

      console.log(response.payload);

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong",
            });
          } else {
            if (user) {
              const payload = {
                user: {
                  email: user.email,
                },
              };

              jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                  if (err) throw err;
                  res.json({ token });
                }
              );
            } else {
              let password = email + config.get("jwtSecret");

              let newUser = new User({ name, email, password, picture });

              newUser.save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "Something went wrong",
                  });
                }

                const payload = {
                  user: {
                    email: data.email,
                  },
                };

                jwt.sign(
                  payload,
                  config.get("jwtSecret"),
                  { expiresIn: 360000 },
                  (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                  }
                );
              });
            }
          }
        });
      }
    });
});

module.exports = router;
