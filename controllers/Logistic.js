import { getProvinces, getCities } from '../services/logistic-service.js';

export const getProvincesController = async (req, res) => {
  try {
    const response = await getProvinces();
    res.status(200).json(response)
  } catch (error) {
      res.status(500).json({msg: error.message})
      console.log(error)
  }
};

export const getCitiesController = async (req, res) => {
  try {
    const response = await getCities(req.query?.provinceId);
    res.status(200).json(response)
  } catch (error) {
      res.status(500).json({msg: error.message})
      console.log(error)
  }
};
