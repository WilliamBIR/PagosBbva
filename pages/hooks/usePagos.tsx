
 import React from "react";
 import { useQuery } from "react-query";
 //import prisma from '../../lib/prisma';
 import { PrismaClient } from "@prisma/client";
 
 export default function useCanciones(skip, take,Id,Fecha,Num_operacion,Comprobante,Empresa,Receptor,Monto,Monto_recibido,Movimiento,Status,Modo) {
   const link = `http://localhost:3000/api/obtenDatos?skip=${skip}&take=${take}`;
   

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
     Status,
     Modo
   }
   //console.log(datosfiltros)
     //const link="http://localhost:3000/api/obtenDatos"
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
  