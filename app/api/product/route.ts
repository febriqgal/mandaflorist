import { NextRequest, NextResponse } from "next/server";
import { productService } from "./service";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title");
  const id = searchParams.get("id");

  if (id) {
    const res = await productService.getById(String(id));
    return NextResponse.json(res);
  }
  if (title) {
    const res = await productService.getByTitle(String(title));
    return NextResponse.json(res);
  }
  const res = await productService.getAll();

  return NextResponse.json(res);
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const res = await productService.post(data);
  return Response.json(res);
};

export const PATCH = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const data = await request.json();
  const res = await productService.patch(String(id), data);
  return Response.json(res);
};

export const DELETE = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const res = await productService.delete(String(id));
  return Response.json(res);
};
