const express = require('express');
const alltomp3 = require('alltomp3');
const request = require('request-promise');
const cors = require('cors')
var things = [];
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

appApi.listen(portApi, function () {
  console.log('API listening on port ' + portApi);
});
