import ticketRepository  from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { unauthorizedError, notFoundError, paymentRequiredError } from "@/errors";
import hotelsRepository from "@/repositories/hotels-repository";
import { TicketStatus } from "@prisma/client";

async function getAllHotelsList(userId: number) {
  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentExists) throw notFoundError();
  
  const ticketAndTicketTypeExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);
  if (!ticketAndTicketTypeExists) throw notFoundError();

  if(ticketAndTicketTypeExists.status !== TicketStatus.PAID) throw paymentRequiredError();

  if(ticketAndTicketTypeExists.TicketType.isRemote === true || ticketAndTicketTypeExists.TicketType.includesHotel === false) throw unauthorizedError();

  const getAllHotels = await hotelsRepository.findManyHotels();
  return getAllHotels;
}

async function getHotelById(hotelId: number, userId: number) {
  const hotelExists = await hotelsRepository.findHotelById(hotelId);
  if (!hotelExists) throw notFoundError();

  const enrollmentExists = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollmentExists) throw notFoundError();
  
  const ticketAndTicketTypeExists = await ticketRepository.findTicketByEnrollmentId(enrollmentExists.id);
  if (!ticketAndTicketTypeExists) throw notFoundError();

  if(ticketAndTicketTypeExists.status !== TicketStatus.PAID) throw paymentRequiredError();

  if(ticketAndTicketTypeExists.TicketType.isRemote !== false || ticketAndTicketTypeExists.TicketType.includesHotel !== true) throw unauthorizedError();

  const hotelRooms = await hotelsRepository.findHotelRoomsById(hotelId);
  return hotelRooms;
}

const hotelsService = {
  getAllHotelsList,
  getHotelById
};

export default hotelsService;
