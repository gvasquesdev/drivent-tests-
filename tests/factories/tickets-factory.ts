import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

export async function createTicketType() {
  return prisma.ticketType.create({
    data: {
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote: faker.datatype.boolean(),
      includesHotel: faker.datatype.boolean(),
    },
  });
}

export async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

export async function createValidTicketType() {
  return prisma.ticketType.create({
    data: {
      name: "Hotel Válido",
      price: 300,
      isRemote: false,
      includesHotel: true,
    },
  });
}

export async function createInvalidTicketType() {
  return prisma.ticketType.create({
    data: {
      name: "Hotel Inválido",
      price: 400,
      isRemote: true,
      includesHotel: true,
    },
  });
}
