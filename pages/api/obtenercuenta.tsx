import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'



export default async function handle(req , res) {
  const {Otro}=req.body
  //console.log(Nombre+ " "+ Otro.queryKey[1])
  //console.log(Otro.queryKey[1])
  try{
  const misDatos = await prisma.pagos.findMany({
    distinct:['cuenta_bancaria_movimiento'],  
    where:{
        cuenta_bancaria_movimiento:{
          contains:Otro.queryKey[1],
        },
        
      },
    })
    //console.log(misDatos)
    res.json({misDatos})
  }catch(error){
    res.status(400).json({error});
  }
}
