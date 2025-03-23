//imports
const axios = require("axios");
const express = require("express");
//Inter-route creation
const router = express.Router();
//All Comics route
router.get("/comics", async (req, res) => {
  try {
    let pageNumber;
    let titleQuery;
    req.query.page ? (pageNumber = Number(req.query.page)) : (pageNumber = 1);
    // console.log(pageNumber);
    //Entries per page handling
    req.query.title
      ? (titleQuery = `&title=${req.query.title}`)
      : (titleQuery = ``);
    const skipedEntries = String(100 * (pageNumber - 1));
    //axios GET
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=100&skip=${skipedEntries}${titleQuery}`
    );
    //get list of comics
    const data = response.data.results;
    // console.log(data);

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//Comics by comicsID route
router.get("/comic/:comicId", async (req, res) => {
  try {
    // console.log(req.params.comicId);
    const comicID = req.params.comicId;
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comic/" +
        comicID +
        "?apiKey=" +
        process.env.API_KEY
    );
    // get all the info of a specific comic by it's id
    res.json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//Comics by characterID route
router.get("/comics/:characterId", async (req, res) => {
  try {
    console.log(req.params.characterId);
    const characterID = req.params.characterId;
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        characterID +
        "?apiKey=" +
        process.env.API_KEY
    );
    // get all the info of a specific character by it's id
    res.json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//Export of Routes
module.exports = router;
