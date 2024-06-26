import { ResponseModel } from "@/types/response.type";
import { checkoutRepo } from "./repository";
import { Checkout, Status } from "@prisma/client";

export const CheckoutService = {
  getAll: async (): Promise<ResponseModel> => {
    const res = await checkoutRepo.findAll();
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  getAllByStatus: async (status: Status): Promise<ResponseModel> => {
    const res = await checkoutRepo.findAllByStatus(status);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  getById: async (id: string): Promise<ResponseModel> => {
    const res = await checkoutRepo.findById(id);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  getByUserId: async (id: string): Promise<ResponseModel> => {
    const res = await checkoutRepo.finByUserId(id);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  post: async (data: Checkout): Promise<ResponseModel> => {
    const res = await checkoutRepo.create(data);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  patch: async (id: string, data: Checkout): Promise<ResponseModel> => {
    const res = await checkoutRepo.update(id, data);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  delete: async (id: string): Promise<ResponseModel> => {
    const res = await checkoutRepo.delete(id);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
};
