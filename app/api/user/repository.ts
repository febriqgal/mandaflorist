import { prisma } from "@/constants/db.connection";
import { ResponseModel } from "@/types/response.type";
import { UserPost } from "@/types/user.type";
import { User } from "@prisma/client";

import { StatusCodes } from "http-status-codes";
export const userRepo = {
  findAll: async (): Promise<ResponseModel> => {
    const res = await prisma.user.findMany();
    return {
      message: "success, get all user",
      status: StatusCodes.OK,
      data: res,
    };
  },
  findById: async (id: string): Promise<ResponseModel> => {
    const res = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return {
      message: "success, get user by id",
      status: StatusCodes.OK,
      data: res,
    };
  },
  findByEmail: async (email: string): Promise<ResponseModel> => {
    const res = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return {
      message: "success, get user by email",
      status: StatusCodes.OK,
      data: res,
    };
  },
  create: async (data: UserPost): Promise<ResponseModel> => {
    const res = await prisma.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase(),
        password: data.password,
      },
    });
    return {
      message: "success, create user",
      status: StatusCodes.CREATED,
      data: res,
    };
  },
  update: async (id: string, data: User): Promise<ResponseModel> => {
    const res = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });
    return {
      message: "success, update user ss",
      status: StatusCodes.OK,
      data: res,
    };
  },
  delete: async (id: string): Promise<ResponseModel> => {
    const res = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "success, delete user",
      status: StatusCodes.OK,
      data: res,
    };
  },
};
