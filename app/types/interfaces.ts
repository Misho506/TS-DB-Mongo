export interface SurfaceTemperatureCelsiusDB {
  mean: number;
  min?: number;
  max?: number;
}

export interface PlanetDB {
  name: string;
  orderFromSun: string;
  hasRings: boolean;
  mainAtmosphere?: Array<string>
  surfaceTemperatureCelsius: SurfaceTemperatureCelsiusDB
  userId: string;
}

export interface UserDB {
  id?: string;
  name: string;
  email: string;
  password: string;
}