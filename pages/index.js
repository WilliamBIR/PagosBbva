import React from 'react';
import styled from 'styled-components'
import BasicTable from './components/Table'
import { useState } from 'react'
import usePagos from './hooks/usePagos';
//import { useQuery } from 'react-query';
//import Table from './components/Table';
import PaginationQueryTable from './components/PaginationQueryTable';
import PaginationTable from './components/Paginationtable';
import Emisor from './components/Emisor';
import CuentaBancaria from './components/CuentaBancaria';


export default function Home() {  

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [limmax,setLimmax]=useState(40)
  const registros=200
  const skips = (page-1)*perPage;
  //console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  const { data: pagos1 } = usePagos(skips,perPage);
  //console.log(pagos1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lista = pagos1 ?? [];



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


  const pagosMemo = React.useMemo(
    () => lista,[lista]
  );

  const previousPage=()=>{
    setPage(prevPage =>prevPage-1)
  }

  
  const nextPage=()=>{
    setPage(prevPage =>prevPage+1)
  }

    const Cambiarlimite=(e)=>{
        setPerPage(e.target.value)
        setLimmax(registros/e.target.value)
        setPage((skips/e.target.value)+1)
    }

  return (
    <Styles>
      <p>
      <Emisor/>
      <CuentaBancaria/>
      </p>
      <PaginationQueryTable 
      columns={columns} 
      data={pagosMemo}
      />
        <select onChange={Cambiarlimite}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
        </select>
      <button onClick={() => previousPage()} disabled={page===1 ? true:false}>
        Previous page{" "}
      </button>
      <button onClick={() => nextPage()} disabled={page===limmax ? true:false}>
        Next page{" "}
      </button>
    </Styles>
  )
}




const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
