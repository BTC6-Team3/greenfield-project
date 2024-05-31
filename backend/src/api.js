const express = require("express");
const router = express.Router();

const api = knex => {
  router.use(express.json());
  //----------------------------------------------------------------------------
  router.get("/areas", (req, res) => {
    knex("areas")
      .select("area_name")
      .then(response => res.send(response))
      .catch(() => res.status(400));
  });
  //----------------------------------------------------------------------------
  router.get("/spots/:area", (req, res) => {
    knex("tourist_spots")
      .select()
      .where({
        area_id: req.params.area,
      })
      .then(response => res.send(response))
      .catch(() => res.status(400));
  });

  return router;
};

module.exports = api;
