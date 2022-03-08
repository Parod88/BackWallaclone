'use strict';

const AdvertisementModel = require('../models/Advertisement.js');

//CRUD

// GET/api/v1/advertisements
const getAdvertisementsList = async (req, res, next) => {
  try {
    const advertisementsList = await AdvertisementModel.find().sort({updatedAt: -1});
    res.status(200).json({advertisementsList});
    // res.status(302).redirect('/api/v1/advertisements/1');
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred.'
    });
    next(error);
  }
};

const getPaginatedAdvertisementsList = async (req, res, next) => {
  let perPage = 9;
  let page = req.params.page || 1;
  try {
    const paginatedAdvertisements = await AdvertisementModel.find({})
      .sort({updatedAt: -1})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    res.json({data: paginatedAdvertisements});
  } catch (error) {
    next(error);
  }
};

// GET/api/v1/advertisements/:id
const getAdvertById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const singleAdvert = await AdvertisementModel.findById(id);
    res.json({data: singleAdvert});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdvertisementsList,
  getPaginatedAdvertisementsList,
  getAdvertById
};
