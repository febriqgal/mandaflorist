import { Cart, Product } from "@prisma/client";

export interface ResponseModel {
  status: number;
  message: string;
  data?: any;
}
