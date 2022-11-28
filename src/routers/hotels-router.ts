import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotelsList } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotelsList)
  .get("/:hotelId", );

export { hotelsRouter };
