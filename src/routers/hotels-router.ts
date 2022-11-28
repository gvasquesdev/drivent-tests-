import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotelRoomsList, getHotelsList } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotelsList)
  .get("/:hotelId", getHotelRoomsList);

export { hotelsRouter };
