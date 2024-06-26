import { NextRequest, NextResponse } from "next/server";
import { userService } from "./service";

import { StatusCodes } from "http-status-codes";
import { UserPost } from "@/types/user.type";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  if (id) {
    const res = await userService.getById(String(id));
    return NextResponse.json(res);
  }

  if (email) {
    const res = await userService.getByEmail(email);
    return NextResponse.json(res);
  }

  const res = await userService.getAll();
  return NextResponse.json(res);
};

export const POST = async (req: NextRequest) => {
  const data: UserPost = await req.json();
  const res = await userService.create(data);
  return NextResponse.json(res, { status: StatusCodes.CREATED });
};

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const res = await userService.update(String(id), body);
  return NextResponse.json(res, { status: StatusCodes.OK });
};
export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const res = await userService.delete(String(id));
  return NextResponse.json(res, { status: StatusCodes.OK });
};
