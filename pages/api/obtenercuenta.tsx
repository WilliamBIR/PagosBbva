import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'



export default async function handle(req , res) {
  const {Otro}=req.body
  try{
  const misDatos = await prisma.pagos.findMany({
    take: 5,
    distinct:['cuenta_bancaria_movimiento'],  
    where:{
      cuenta_bancaria_movimiento:{
          contains:Otro.queryKey[1],
        },
        
      },
      orderBy:{cuenta_bancaria_movimiento:"asc"},
    })
    //console.log(misDatos)
    res.json({misDatos})
  }catch(error){
    res.status(400).json({error});
  }
}
