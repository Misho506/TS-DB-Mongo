import asyncHandler from 'express-async-handler';
import Planet from '../models/planetModel';

const getGuidesOfPlanets = asyncHandler(async (req: any, res) => {
  Planet.find({})
    .then((data) => {
      console.log("--------->", data);
      if (data.length > 0) {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      console.log("ERROR ------>>", err);
    });
})

export {
  getGuidesOfPlanets,
}
