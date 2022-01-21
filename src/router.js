const express = require("express");
const app = require("./app");
const router = express.Router();
const bodyParser = express.json();
const TourdatesService = require("./tourdates-service");
const ArchiveService = require("./archive-service");
router.use(bodyParser);

const serializeArchiveDate = (archiveDate) => ({
  id: archiveDate.id,
  year: archiveDate.year,
  date: archiveDate.month_day,
  venue: archiveDate.venue,
  setlist: archiveDate.setlist,
  video: archiveDate.video,
  images: archiveDate.images,
});

router.route("/home").get((req, res) => {
  res.status(200).send("Here is the homepage");
});

router.route("/bio").get((req, res) => {
  res.status(200).send("Here is the bio page");
});

router.route("/follow").get((req, res) => {
  res.status(200).send("Here are the social medias");
});

router.route("/releases").get((req, res) => {
  res.status(200).send("Here are some records");
});

router.route("/store").get((req, res) => {
  res.status(200).send("Here is some stuff to buy");
});

router.route("/tour").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  TourdatesService.getAllTourDates(knexInstance)
    .then((tourdates) => {
      res.json(tourdates);
    })
    .catch(next);
});

router.route("/archive/:year").get((req, res, next) => {
  const { year } = req.params;
  ArchiveService.getByYear(req.app.get("db"), year)
    .then((year) => {
      res.json(year.map(serializeArchiveDate));
    })
    .catch(next);
});

module.exports = router;

/*
exerciseRouter.route("/exercises/:user_id").get((req, res, next) => {
  const { user_id } = req.params;
  ExerciseService.getMyExercises(req.app.get("db"), user_id)
    .then((exercises) => {
      res.json(exercises.map(serializeExercise));
    })
    .catch(next);
});
*/
