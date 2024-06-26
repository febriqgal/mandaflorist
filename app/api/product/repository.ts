import { prisma } from "@/constants/db.connection";
import { Product } from "@prisma/client";

export const productRepo = {
  findAll: async () => {
    const res = await prisma.product.findMany();
    return res;
  },
  findById: async (id: string) => {
    const res = prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        review: {
          select: {
            rating: true,
            desc: true,
            createdAt: true,
            user: { select: { name: true } },
          },
        },
      },
    });
    return res;
  },
  findByTitle: (title: string) => {
    const res = prisma.product.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
    return res;
  },
  create: async (data: Product) => {
    const res = await prisma.product.create({
      data: data,
    });
    return res;
  },
  update: async (id: string, data: Product) => {
    const res = await prisma.product.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res;
  },
  delete: async (id: string) => {
    const res = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return res;
  },
};
