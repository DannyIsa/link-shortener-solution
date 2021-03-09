const express = require("express");
var urlExists = require("url-exists");
const router = express.Router();
const dataBase = require("../data-base/database");

router.get("/:shortUrl", async (req, res) => {
  try {
    const fullUrl = await dataBase.returnFullUrl(req.params.shortUrl);

    res.writeHead(302, {
      location: fullUrl,
    });
    dataBase.addClick(fullUrl);
    res.end();
  } catch (err) {
    res.status(404).json({ msg: `${req.params.shortUrl}- Url not found` });
  }
});

router.post("/new", (req, res) => {
  const fullUrl = req.body.url;
  urlExists(fullUrl, async (err, exists) => {
    if (exists) {
      res.json(
        `Your short link- ${await dataBase.addNewUrl(
          fullUrl
        )}, Number of entries: ${await dataBase.showClicks(
          fullUrl
        )}, Created at: ${await dataBase.showCreateDate(fullUrl)}`
      );
    } else {
      res.status(400).json({ msg: `${fullUrl}- not a valid link` });
    }
  });
});

module.exports = router;
