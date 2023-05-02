"use strict";
require("dotenv").config();
const express = require("express");
const movieKey = process.env.API_KEY;
const axios = require("axios");
const moviesData = require("./Movie Data/data.json");
const server = express();
let newArr = [];
const port = 3001;
const cors = require("cors");
server.use(cors());

function MoviesApi(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;

  newArr.push(this);
}

function Movies(title, poster_path, overview, id, vote_average) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
  this.id = id;
  this.vote_average = vote_average;
}

server.get("/trending", getMovies);
server.get("/search", searchMovies);
server.get("/now_playing", nowPlaying);
server.get("/top_rated", topRated);

function topRated(req, res) {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieKey}`;

  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

function searchMovies(req, res) {
  let searchByName = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchByName}`;

  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

function nowPlaying(req, res) {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${movieKey}`;
  axios.get(url).then((result) => {
    res.send(result.data);
  });
}

async function getMovies(req, res) {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${movieKey}&language=en-US`;

  let movieFromAPI = await axios.get(url);
  let newMovie = movieFromAPI.data.results.map((item) => {
    return new MoviesApi(
      item.id,
      item.title,
      item.release_date,
      item.poster_path,
      item.overview
    );
  });
  res.send(newMovie);
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
