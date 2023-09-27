import asyncHandler from 'express-async-handler';
import Planet from '../models/planetModel';
import { SurfaceTemperatureCelsiusDB } from '../types/interfaces';

const getGuidesOfPlanets = asyncHandler(async (req: any, res) => {
  const { userId } = req.body
  try {
    const planets: Array<SurfaceTemperatureCelsiusDB> = await Planet.find({ userId })
    res.status(200).json(planets);
  } catch (error) {
    console.log("ERROR ------>>", error);
    res.status(error.status).json(error);
  }
})

export {
  getGuidesOfPlanets,
}
