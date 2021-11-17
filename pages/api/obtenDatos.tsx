import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export default async function handle(req, res){

  try{
    const { take, skip } = req.query;
    const takeInt = parseInt(take);
    const skipInt = parseInt(skip);
    const misDatos = await prisma.pagos.findMany({
      skip: skipInt,
      take: takeInt,
    });
    res.json(misDatos);
  }catch(error){
    res.status(400).json({error});
  }

}
