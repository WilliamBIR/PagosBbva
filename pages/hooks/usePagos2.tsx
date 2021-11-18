import React from "react";
 import { useQuery } from "react-query";
 //import prisma from '../../lib/prisma';
 import { PrismaClient } from "@prisma/client";
 
 export default function useCuantos(skip, take,Id,Fecha,Num_operacion,Comprobante,Empresa,Receptor,Monto,Monto_recibido,Movimiento,Status) {
   //const link = `http://localhost:3000/api/obtenDatos?skip=${skip}&take=${take}`;
   

   const datosfiltros={
     Id,
     Fecha,
     Num_operacion,
     Comprobante,
     Empresa,
     Receptor,
     Monto,
     Monto_recibido,
     Movimiento,
     Status
   }
   //console.log(datosfiltros)
    const link="http://localhost:3000/api/obtenCuantos"
   return useQuery(
         ['canciones',datosfiltros, link],
         async () => {
           console.log(link)
           console.log(datosfiltros)

           const res = await fetch(link,{
            body:JSON.stringify(datosfiltros),
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
        })
        //const res = await fetch("http://localhost:3000/api/obtenDatos");
           
           return res.json();
         } ,
         { keepPreviousData: true })
     };
  