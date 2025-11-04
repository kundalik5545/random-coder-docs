import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  console.log(" todo items request");

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todoItems = await prisma.todoItem.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(" todo items", todoItems);

    return NextResponse.json(todoItems);
  } catch (error) {
    console.error("Error fetching todo items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, completed } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const todoItem = await prisma.todoItem.create({
      data: {
        userId: session.user.id,
        title: title.trim(),
        description: description?.trim() || null,
        completed: completed || false,
      },
    });

    return NextResponse.json(todoItem, { status: 201 });
  } catch (error: any) {
    console.error("Error creating todo item:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A todo item with this title already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
