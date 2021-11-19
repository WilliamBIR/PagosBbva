import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'



export default async function handle(req , res) {
  const {Otro}=req.body
  //console.log(Nombre+ " "+ Otro.queryKey[1])
  //console.log(Otro.queryKey[1])
  try{
  const misDatos = await prisma.pagos.findMany({
    take: 5,
    distinct:['empresa_nombre'],  
    where:{
        empresa_nombre:{
          contains:Otro.queryKey[1],
        },
        
      },
      orderBy:{empresa_nombre:"asc"},
    })
    //console.log(misDatos)
    res.json({misDatos})
  }catch(error){
    res.status(400).json({error});
  }
}
