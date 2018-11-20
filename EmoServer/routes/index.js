var express = require('express');
var router = express.Router();

const data = {
  anger: 0,
  fear: 0,
  disgust: 0,
  happiness: 0,
  surprise: 0,
  sadness: 0
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/setdata', (req, res, next) => {
  res.render('inputForm', {emotions: data, truncEmotions: truncData()});
});

router.post('/postdata', (req, res, next) => {
  updateData(req);
  res.redirect('/setdata');
});

/* Display data */
router.get('/getdata', (req, res, next) => {
  res.json(data);
})

function updateData(req) {
  let sum = parseFloat(req.body.anger) + parseFloat(req.body.fear) + parseFloat(req.body.disgust)
           + parseFloat(req.body.happiness) + parseFloat(req.body.surprise) + parseFloat(req.body.sadness);
  data.anger = parseFloat(req.body.anger) / sum;
  data.fear = parseFloat(req.body.fear) / sum;
  data.disgust = parseFloat(req.body.disgust) / sum;
  data.happiness = parseFloat(req.body.happiness) / sum;
  data.surprise = parseFloat(req.body.surprise) / sum;
  data.sadness = parseFloat(req.body.sadness) / sum;
}

function truncData() {
  return {
    anger: Math.round(data.anger * 100),
    fear: Math.round(data.fear * 100),
    disgust: Math.round(data.disgust * 100),
    happiness: Math.round(data.happiness * 100),
    surprise: Math.round(data.surprise * 100),
    sadness: Math.round(data.sadness * 100)
  }
}


module.exports = router;
