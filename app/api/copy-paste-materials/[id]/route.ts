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
    const copyPasteMaterial = await prisma.copyPasteMaterial.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!copyPasteMaterial) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(copyPasteMaterial);
  } catch (error) {
    console.error("Error fetching copy paste material:", error);
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
    const { title, description } = body;

    // Check if item exists and belongs to user
    const existingItem = await prisma.copyPasteMaterial.findFirst({
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

    const copyPasteMaterial = await prisma.copyPasteMaterial.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(copyPasteMaterial);
  } catch (error) {
    console.error("Error updating copy paste material:", error);
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
    const existingItem = await prisma.copyPasteMaterial.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingItem) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.copyPasteMaterial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting copy paste material:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
