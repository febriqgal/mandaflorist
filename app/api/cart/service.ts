import { Cart } from "@prisma/client";
import { cartRepo } from "./repository";
import { ResponseModel } from "@/types/response.type";

export const cartService = {
  getAll: async (): Promise<ResponseModel> => {
    const res = await cartRepo.findAll();
    return {
      message: "success, get all cart",
      status: 200,
      data: res,
    };
  },
  getById: async (id: string) => {
    const res = cartRepo.findById(id);
    return res;
  },
  getByUserId: async (userId: string): Promise<ResponseModel> => {
    const res = await cartRepo.findByUserId(userId);
    return {
      message: "success, get cart by user id",
      status: 200,
      data: res,
    };
  },
  create: async (data: Cart) => {
    const res = cartRepo.create(data);
    return res;
  },
  update: async (id: string, data: any) => {
    const res = await cartRepo.update(id, data);
    return res;
  },
  deleteMany: async (id: string) => {
    const res = cartRepo.deleteMany(id);
    return res;
  },
};
