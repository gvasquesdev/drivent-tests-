import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findPaidTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
      status: TicketStatus.PAID
    }
  });
}

async function findHotelById(id: number) {
  return prisma.hotel.findFirst({
    where: {
      id
    }, include: {
      Rooms: true
    }
  });
}

async function findHotelsList(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
      isRemote: false,
      includesHotel: true
    }
  });
}

async function findManyHotels() {
  return prisma.hotel.findMany();
}

async function findHotelRoomsById(hotelId: number) {
  return prisma.hotel.findMany({
    where: {
      id: hotelId,
    }, include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findPaidTickets,
  findHotelById,
  findHotelsList,
  findManyHotels,
  findHotelRoomsById
};

export default hotelsRepository;

