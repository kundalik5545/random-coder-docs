import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const todoItem = await prisma.todoItem.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!todoItem) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(todoItem);
  } catch (error) {
    console.error("Error fetching todo item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, description, completed } = body;

    // Check if item exists and belongs to user
    const existingItem = await prisma.todoItem.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updateData: {
      title?: string;
      description?: string | null;
      completed?: boolean;
    } = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { error: "Title cannot be empty" },
          { status: 400 }
        );
      }
      updateData.title = title.trim();
    }

    if (description !== undefined) {
      updateData.description = description?.trim() || null;
    }

    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }

    const todoItem = await prisma.todoItem.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(todoItem);
  } catch (error: any) {
    console.error("Error updating todo item:", error);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if item exists and belongs to user
    const existingItem = await prisma.todoItem.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.todoItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting todo item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
