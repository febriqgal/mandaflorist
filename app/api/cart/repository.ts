import { prisma } from "@/constants/db.connection";
import { Cart } from "@prisma/client";

export const cartRepo = {
  findAll: async () => {
    const res = await prisma.cart.findMany({
      include: {
        products: true,
      },
    });
    return res;
  },
  findById: async (id: string) => {
    const res = await prisma.cart.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  },
  findByUserId: async (userId: string) => {
    const res = await prisma.cart.findMany({
      where: {
        userId: userId,
        isHidden: false,
      },
      include: {
        products: true,
      },
    });
    return res;
  },
  create: async (data: Cart) => {
    const res = await prisma.cart.create({
      data: data,
    });
    return res;
  },
  update: async (id: string, data: Cart) => {
    const res = await prisma.cart.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res;
  },
  deleteMany: async (id: string) => {
    const res = await prisma.cart.deleteMany({
      where: {
        id: {
          in: [id],
        },
      },
    });
    return res;
  },
};
