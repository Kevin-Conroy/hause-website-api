const express = require("express");
const app = require("./app");
const router = express.Router();
const bodyParser = express.json();
const TourdatesService = require("./tourdates-service");
const ArchiveService = require("./archive-service");
const NewsService = require("./news-service");
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

const serializeNewsItem = (newsItem) => ({
  id: newsItem.id,
  month: newsItem.month,
  date: newsItem.date,
  year: newsItem.year,
  title: newsItem.title,
  content: newsItem.content
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

router.route("/news").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  NewsService.getAllNews(knexInstance)
    .then((news) => {
      res.json(news.map(serializeNewsItem));
    })
    .catch(next);
});

router.route("/latestnews").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  NewsService.getLatestNews(knexInstance)
    .then((news) => {
      res.json(news.map(serializeNewsItem));
    })
    .catch(next);
});

router.route("/article/:article_id")
  .get((req, res, next) => {
    const { article_id } = req.params;
    NewsService.getById(req.app.get("db"), article_id).then((article) => {
      if (!article) {
        return res.status(404).json({
          error: { message: `Article not found` },
        });
      }
      res.json(serializeNewsItem(article)).catch(next);
    });
  })


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
