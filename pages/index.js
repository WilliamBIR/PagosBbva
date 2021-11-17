import React from 'react';
import styled from 'styled-components'
import BasicTable from './components/Table'
import { useState } from 'react'
import usePagos from './hooks/usePagos';
//import { useQuery } from 'react-query';
//import Table from './components/Table';
import PaginationQueryTable from './components/PaginationQueryTable';
import PaginationTable from './components/Paginationtable';


export default function Home({canciones, totalCanciones}) {  

  const [page, setPage] = useState(38);
  const [perPage, setPerPage] = useState(5);
  const skips = (page-1)*perPage;
  console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  const { data: pagos1 } = usePagos(skips,perPage);
  console.log(pagos1);
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
    console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  
    if(page===2){
      console.log("a")
      setPrevious(false)
    }
    else{
      setNext(true)
      setPrevious(true)
    }
  }

  
  const nextPage=()=>{
    setPage(prevPage =>prevPage+1)
    console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  
    if(page>=40){
      setNext(false)
    }
    else{
      setNext(true)
      setPrevious(true)  
    }
  }


  return (
    <Styles>
      <PaginationQueryTable 
      columns={columns} 
      data={pagosMemo}
      />
      <button onClick={() => previousPage()} disabled={page===1 ? true:false}>
        Previous page{" "}
      </button>
      <button onClick={() => nextPage()} disabled={page===40 ? true:false}>
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
