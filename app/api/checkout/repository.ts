import { prisma } from "@/constants/db.connection";
import { Checkout, Status } from "@prisma/client";

export const checkoutRepo = {
  findAll: async () => {
    const res = await prisma.checkout.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,

        cart: { include: { products: true } },
      },
    });
    return res;
  },
  findAllByStatus: async (status: Status) => {
    const res = await prisma.checkout.findMany({
      orderBy: { createdAt: "desc" },
      where: { status: status },
      include: {
        user: true,

        cart: { include: { products: true } },
      },
    });
    return res;
  },
  findById: async (id: string) => {
    const res = prisma.checkout.findUnique({
      where: {
        id: id,
      },
    });
    return res;
  },
  finByUserId: async (id: string) => {
    const res = prisma.checkout.findMany({
      where: {
        userId: id,
      },
      orderBy: { createdAt: "desc" },
      include: { cart: { include: { products: true } } },
    });
    return res;
  },

  create: async (data: any) => {
    console.log(data);

    const res = await prisma.checkout.create({
      data: {
        ...data,
        cart: {
          connect: data.cart.map((c: any) => ({ id: c.id })),
        },
      },
    });
    return res;
  },
  update: async (id: string, data: Checkout) => {
    const res = await prisma.checkout.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res;
  },
  delete: async (id: string) => {
    const res = await prisma.checkout.delete({
      where: {
        id: id,
      },
    });
    return res;
  },
};
