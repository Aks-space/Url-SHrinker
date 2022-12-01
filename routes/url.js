const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

//@route POST /api/url
//@desc get all short url
router.get("/", async (req, res) => {
  Url.find()
    .then((urls) => {
      res.json(urls);
    })
    .catch((err) => {
      console.log(err);
    });
});

//@route POST /api/url/shorten
//@desc Create short url ramdom
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  //Create an url code
  const urlCode = shortid.generate();

  //check the long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save().then(() => {
          res.json(url);
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

//@route POST /api/url/shortencustom
//@desc Create short url customized
router.post("/shortencustom", async (req, res) => {
  const { longUrl, customCode } = req.body;

  //Create an url code
  const urlCode = customCode;

  //check the long url
  if (validUrl.isUri(longUrl)) {
    try {
      const shortUrl = urlCode;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save().then(() => {
        res.json(url);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
