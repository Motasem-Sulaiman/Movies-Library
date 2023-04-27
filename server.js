"use strict";
const express = require("express");
const moviesData = require("./Movie Data/data.json");
const server = express();
const port = 3001;
const cors = require("cors");
server.use(cors());

function Movies(title, poster_path, overview,id,vote_average) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
  this.id=id;
  this.vote_average=vote_average;
}

server.get("/", (req, res) => {
  const data = new Movies(
    moviesData.title,
    moviesData.poster_path,
    moviesData.overview,
    moviesData.id,
    moviesData.vote_average
  );
  res.json(data);
});

server.get("/favorite", (req, res) => {
  res.send("Welcome to Favorite Page");
});

function notFound(req, res) {
  res.status(404).send({
    status: 404,
    responseText: "Page not found, please write the correct path",
  });
}

function serverErorr(req, res) {
  res.status(500).send({
    status: 500,
    responseText: "Sorry, something went wrong",
  });
}

server.use(notFound);
server.use(serverErorr);

server.listen(port, () => {
  console.log(`server port is ${port}`);
});
