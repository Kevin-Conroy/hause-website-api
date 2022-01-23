const newsService = {
  getAllNews(knex) {
    return knex.select("*").from("news");
  },

  getById(knex, article_id) {
    return knex.from("news").select("*").where("id", article_id).first();
  },
};

module.exports = newsService;
