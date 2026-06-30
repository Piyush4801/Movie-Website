const express = require("express");
const router = express.Router();

const BASE = "https://api.themoviedb.org/3";

router.get(/(.*)/, async (req, res) => {
  try {
    const url = new URL(BASE + req.path);

    Object.entries(req.query).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });

    url.searchParams.set("api_key", process.env.TMDB_KEY);

    const response = await fetch(url);

    const data = await response.json();

    res.status(response.status).json(data);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message
    });

  }
});

module.exports = router;