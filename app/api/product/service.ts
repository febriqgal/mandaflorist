import { Product } from "@prisma/client";
import { productRepo } from "./repository";
import { ResponseModel } from "@/types/response.type";

export const productService = {
  getAll: async (): Promise<ResponseModel> => {
    const res = await productRepo.findAll();
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  getByTitle: async (title: string): Promise<ResponseModel> => {
    const res = await productRepo.findByTitle(title);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  getById: async (id: string): Promise<ResponseModel> => {
    const res = await productRepo.findById(id);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  post: async (data: Product): Promise<ResponseModel> => {
    const res = await productRepo.create(data);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  patch: async (id: string, data: Product): Promise<ResponseModel> => {
    const res = await productRepo.update(id, data);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
  delete: async (id: string): Promise<ResponseModel> => {
    const res = await productRepo.delete(id);
    return {
      message: "success",
      status: 200,
      data: res,
    };
  },
};
