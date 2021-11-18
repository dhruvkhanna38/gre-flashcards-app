const express = require("express");
const router = express.Router();
const {data} = require("../data/flashcardData.json");
const {cards} = data;

router.get("/", (req, res) =>{
  const numberOfCards = cards.length;
  const flashCardId = Math.floor(Math.random()* numberOfCards);
  res.redirect(`/cards/${flashCardId}`);
});

router.get("/:id", (req, res) => {
  const {side} = req.query;
  const {id} = req.params;

  if(!side){
    return res.redirect(`/cards/${id}?side=word`);
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  const templateData = { id, text, name, side};


    if (side === 'word'){
        templateData.sideToShow = 'meaning';
        templateData.sideToShowDisplay = 'Meaning';
    } else if (side === 'meaning') {
        templateData.sideToShow = 'word';
        templateData.sideToShowDisplay = 'Word';
    }
    res.render('card', templateData);
});

module.exports = router;
