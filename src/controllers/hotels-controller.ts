import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import hotelsService from "@/services/hotels-service";
import httpStatus from "http-status";

export async function getHotelsList(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const getHotels = await hotelsService.getAllHotelsList(userId);
    res.status(httpStatus.OK).send(getHotels);
  } catch (error) {
    if(error.name === "NotFoundError") res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") res.sendStatus(httpStatus.UNAUTHORIZED);
    if(error.name === "PaymentRequiredError") res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function getHotelRoomsList(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const getHotelRooms = await hotelsService.getHotelById(+hotelId, userId);
    res.status(httpStatus.OK).send(getHotelRooms);
  } catch (error) {
    if(error.name === "NotFoundError") res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "UnauthorizedError") res.sendStatus(httpStatus.UNAUTHORIZED);
    if(error.name === "PaymentRequiredError") res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
