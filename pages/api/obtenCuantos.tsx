import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export default async function handle(req, res){

  try{
    const { take, skip} = req.query;
    //console.log(req.query)
    console.log(req.body)
    const {Id,Fecha,Num_operacion,Comprobante,Empresa,Receptor,Monto,Monto_recibido,Movimiento,Status}=req.body
    console.log(Status)
    console.log(Id)
   

    const takeInt = parseInt(take);
    const skipInt = parseInt(skip);
    const misDatos = await prisma.pagos.count({
      where:{
         id:{contains:Id},
        fecha_qn:{contains:Fecha},
        num_operacion:{contains:Num_operacion},
        comprobante_pagado:{contains:Comprobante},
        empresa_nombre:{contains:Empresa},
        receptor_nombre:{contains:Receptor},
        monto:{contains:Monto},
        monto_recibido:{contains:Monto_recibido},
        cuenta_bancaria_movimiento:{contains:Movimiento},
        status_pago_nombre:{contains:Status}
       },
      });
    res.json(misDatos);
  }catch(error){
    res.status(400).json({error});
  }

}
