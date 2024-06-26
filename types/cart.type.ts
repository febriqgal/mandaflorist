import { Cart, Product } from "@prisma/client";

export interface CartWithProduct extends Cart {
  products: Product;
}
