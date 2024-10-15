import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const id = parseInt(pathname.split('/').pop() ?? '', 10);
  if (isNaN(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }
  const jobs = await prisma.job.findUnique({
    where: { id },
  });
  if (jobs) {
    return NextResponse.json(jobs);
  } else {
    return NextResponse.json({ message: 'Task not found' }, { status: 404 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const { pathname } = req.nextUrl;
    const id = parseInt(pathname.split("/").pop() ?? "", 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const currentTask = await prisma.job.findUnique({
      where: { id },
    });

    if (!currentTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatedTask = await prisma.job.update({
      where: { id },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating documentation:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;
    const id = parseInt(pathname.split('/').pop() ?? '', 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const jobItem = await prisma.job.findUnique({
      where: { id },
    });

    if (!jobItem) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    await prisma.job.delete({
      where: { id },
    });
    return NextResponse.json({});
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}