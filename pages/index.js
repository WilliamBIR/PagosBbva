import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';
import BasicTable from './components/Table'
export default function Home() {
  const columns=React.useMemo(
    ()=>[
    {
      Header:"Id",
      accessor:"id",
    },
    {
      Header:"Fecha",
      accessor:"fecha_qn",
    },
    {
      Header:"Num operación",
      accessor:"num_operacion",
    },
    {
      Header:"Comprobante pagado",
      accessor:"comprobante_pagado",
    },
    {
      Header:"Empresa",
      accessor:"empresa_nombre",
    },
    {
      Header:"Receptor",
      accessor:"receptor_nombre",
    },
    {
      Header:"Monto",
      accessor:"monto",
    },
    {
      Header:"Monto Recibido",
      accessor:"monto_recibido",
    },
    {
      Header:"Movimiento",
      accessor:"cuenta_bancaria_movimiento",
    },
    {
      Header:"Status",
      accessor:"status_pago_nombre",
    }
  ],
  []
  );

  const data= React.useMemo(
    ()=>[
    {"id":"47154","fecha":"2021-11-03 11:25:38","forma":"4","forma_pago_nombre":"Tarjeta de cr\u00e9dito","receptor":"7789","receptor_nombre":"ERIC TRUJILLO VELAZQUEZ","monto":"2685.4","monto_recibido":"2685.4","num_operacion":"5NW952990T768361L","cuenta_bancaria_movimiento":null,"cuenta_bancaria_movimiento_nombre":null,"status_pago":"1","status_pago_nombre":"Tenemos el dinero","comprobante_pagado":null,"empresa":null,"empresa_nombre":null,"fecha_qn":"03-Nov-2021"},
    {"id":"47163","fecha":"2021-11-03 07:17:23","forma":"4","forma_pago_nombre":"Tarjeta de cr\u00e9dito","receptor":"7688","receptor_nombre":"Grupo Empresarial de Servicios Comerciales y Abastecimiento Industrial","monto":"2685.4","monto_recibido":"2685.4","num_operacion":"4DY9544697297182W","cuenta_bancaria_movimiento":null,"cuenta_bancaria_movimiento_nombre":null,"status_pago":"1","status_pago_nombre":"Tenemos el dinero","comprobante_pagado":null,"empresa":null,"empresa_nombre":null,"fecha_qn":"03-Nov-2021"},
    {"id":"47146","fecha":"2021-11-02 07:08:24","forma":"4","forma_pago_nombre":"Tarjeta de cr\u00e9dito","receptor":"6526","receptor_nombre":"FEDERICO GARCIA SARO","monto":"2550.49","monto_recibido":"2550.49","num_operacion":"7HG46628KD337403S","cuenta_bancaria_movimiento":null,"cuenta_bancaria_movimiento_nombre":null,"status_pago":"1","status_pago_nombre":"Tenemos el dinero","comprobante_pagado":null,"empresa":"122647","empresa_nombre":"Tecnolog\u00eda en Aspersi\u00f3n","fecha_qn":"02-Nov-2021"}
    ],[]
  )



  return (
    <div>
      <BasicTable columns={columns} data={data}/>
    </div>
  )
}
