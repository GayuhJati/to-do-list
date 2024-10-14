import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const updatedJob = await prisma.job.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedJob);
  } else if (req.method === "DELETE") {
    await prisma.job.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  }
}
