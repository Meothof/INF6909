var express = require('express');
var router = express.Router();

const emotions = {
  anger: 0,
  fear: 0,
  disgust: 0,
  happiness: 0,
  surprise: 0,
  sadness: 0
};

const transitionTimes = {
  anger: 1,
  fear: 1,
  disgust: 1,
  happiness: 1,
  surprise: 1,
  sadness: 1
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/setdata', (req, res, next) => {
  res.render('inputForm', {
    emotions: emotions,
    transitionTime: transitionTimes,
    truncEmotions: truncEmotions(),
    time: calcTime()
  });
});

router.post('/postdata', (req, res, next) => {
  updateEmotions(req.body);
  updateTransitionTimes(req.body);
  res.redirect('/setdata');
});

/* Display data */
router.get('/getdata', (req, res, next) => {
  res.json({
    emotions: emotions,
    transitionTime: calcTime()
  });
})

function updateEmotions(reqBody) {
  let sum = parseFloat(reqBody.anger) + parseFloat(reqBody.fear) + parseFloat(reqBody.disgust)
           + parseFloat(reqBody.happiness) + parseFloat(reqBody.surprise) + parseFloat(reqBody.sadness);
  sum = (sum === 0) ? 1 : sum;
  emotions.anger = parseFloat(reqBody.anger) / sum;
  emotions.fear = parseFloat(reqBody.fear) / sum;
  emotions.disgust = parseFloat(reqBody.disgust) / sum;
  emotions.happiness = parseFloat(reqBody.happiness) / sum;
  emotions.surprise = parseFloat(reqBody.surprise) / sum;
  emotions.sadness = parseFloat(reqBody.sadness) / sum;
}

function updateTransitionTimes(reqBody) {
  transitionTimes.anger = parseFloat(reqBody.angerTime || 1);
  transitionTimes.fear = parseFloat(reqBody.fearTime || 1);
  transitionTimes.disgust = parseFloat(reqBody.disgustTime || 1);
  transitionTimes.happiness = parseFloat(reqBody.happinessTime || 1);
  transitionTimes.surprise = parseFloat(reqBody.surpriseTime || 1);
  transitionTimes.sadness = parseFloat(reqBody.sadnessTime || 1);
}

function truncEmotions() {
  return {
    anger: Math.round(emotions.anger * 100),
    fear: Math.round(emotions.fear * 100),
    disgust: Math.round(emotions.disgust * 100),
    happiness: Math.round(emotions.happiness * 100),
    surprise: Math.round(emotions.surprise * 100),
    sadness: Math.round(emotions.sadness * 100)
  }
}

function calcTime() {
  let time = 0;
  time += emotions.anger * transitionTimes.anger
        + emotions.fear * transitionTimes.fear
        + emotions.disgust * transitionTimes.disgust
        + emotions.happiness * transitionTimes.happiness
        + emotions.surprise * transitionTimes.surprise
        + emotions.sadness * transitionTimes.sadness
  return  Math.round( time * 100) / 100;
} 

module.exports = router;