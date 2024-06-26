import { prisma } from "@/constants/db.connection";
import { NextRequest, NextResponse } from "next/server";
import { cartService } from "./service";
export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");
  if (userId) {
    const res = await cartService.getByUserId(userId);
    return NextResponse.json(res);
  }
  const res = await cartService.getAll();
  return NextResponse.json(res);
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const res = await prisma.cart.create({
    data,
  });
  return Response.json(res);
};

export const PATCH = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = await req.json();
  const res = await prisma.cart.update({
    where: {
      id: String(id),
    },
    data,
  });
  return Response.json(res);
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const ids = searchParams.get("ids");
  if (ids) {
    const res = await cartService.deleteMany(ids);
    return NextResponse.json(res);
  }
};
