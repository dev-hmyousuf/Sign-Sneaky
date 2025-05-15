import { Coordinate } from "../types/types";

export const randomFoodPosition = (maxX: number, maxY: number): Coordinate => {
  // Ensure food is always within visible grid boundaries (with some margin)
  return {
    x: Math.floor(Math.random() * (maxX - 4)) + 2,
    y: Math.floor(Math.random() * (maxY - 4)) + 2,
  };
};