const tourdatesService = {
    getAllTourDates(knex) {
      return knex.select("*").from("tour_dates");
    },
}

module.exports = tourdatesService;