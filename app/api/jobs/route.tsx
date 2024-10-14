import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const jobs = await prisma.job.findMany();
    console.log("Jobs from DB:", jobs);

    const response = jobs.map((job) => ({
        id: job.id,
        title: job.title,
        description: job.description
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
