const archiveService = {
  getByYear(knex, year) {
    return knex.from("hause_tour_archive").select("*").where("year", year);
  },
};

module.exports = archiveService;
