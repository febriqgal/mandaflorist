import { NextRequest, NextResponse } from "next/server";
import { CheckoutService } from "./service";
import { Status } from "@prisma/client";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");

  if (id) {
    const res = await CheckoutService.getById(String(id));
    return NextResponse.json(res);
  }
  if (userId) {
    const res = await CheckoutService.getByUserId(String(userId));
    return NextResponse.json(res);
  }
  if (status) {
    const res = await CheckoutService.getAllByStatus(status as Status);
    return NextResponse.json(res);
  }
  const res = await CheckoutService.getAll();

  return NextResponse.json(res);
};

export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);

  const res = await CheckoutService.post(data);
  return Response.json(res);
};

export const PATCH = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = await request.json();
  const res = await CheckoutService.patch(String(id), data);
  return Response.json(res);
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const res = await CheckoutService.delete(String(id));
  return Response.json(res);
};
