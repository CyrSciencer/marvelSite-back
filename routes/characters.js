//imports
const axios = require("axios");
const express = require("express");
//Inter-route creation
const router = express.Router();
//All characters route
router.get("/characters", async (req, res) => {
  try {
    let nameQuery = ``;
    let pageNumber;
    req.query.page ? (pageNumber = req.query.page) : (pageNumber = 1);
    //Entries per page handling
    const skipedEntries = String(100 * (pageNumber - 1));
    req.query.name && (nameQuery = `&name=${req.query.name}`);
    //axios GET
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=100&skip=${skipedEntries}${nameQuery}`
    );
    //get infos of all characters
    const data = response.data;
    // console.log("name==> " + req.query.name);

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
});
//character by characterID route
router.get("/character/:characterId", async (req, res) => {
  try {
    // console.log(req.params.characterId);
    const characterID = req.params.characterId;
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/character/" +
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
