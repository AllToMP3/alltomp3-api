const express = require('express');
const alltomp3 = require('alltomp3');
const request = require('request-promise');
const cors = require('cors');
let appApi = express();
const portApi = 8080;

appApi.use(cors());

appApi.get('/v1/guess-track/:q', function (req, res) {
  if (!req.params.q) {
    return res.status(400).send({error: "Query missing"});
  }
  alltomp3.guessTrackFromString(req.params.q).then(infos => {
    res.send(infos);
  }).catch(e => {
    console.log(e);
    res.status(404).send({error: "No track found"});
  });
});

appApi.get('/v1/find-music-video/', function (req, res) {
  if (!req.query.title || !req.query.artist) {
    return res.status(400).send({error: "title or artist missing"});
  }
  alltomp3.findVideoForSong({title: req.query.title, artistName: req.query.artist, duration: req.query.duration}).then(videos => {
    videos.forEach(v => {
      delete v.realLike;
      delete v.videoScore;
    });
    res.send(videos);
  }).catch(e => {
    console.log(e);
    res.status(404).send({error: "No videos found"});
  });
});

appApi.listen(portApi, function () {
  console.log('API listening on port ' + portApi);
});
