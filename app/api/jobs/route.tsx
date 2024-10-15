import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        id: 'asc', 
      },
    });

    const response = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
    }));

    return NextResponse.json({
      data: response,
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const newJobs = await prisma.job.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(newJobs, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
