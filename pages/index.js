import React from 'react';
import styled from 'styled-components'
import BasicTable from './components/Table'
import { useState } from 'react'
import usePagos from './hooks/usePagos';
import usePagos2 from './hooks/usePagos2';
//import { useQuery } from 'react-query';
//import Table from './components/Table';
import PaginationQueryTable from './components/PaginationQueryTable';
import PaginationTable from './components/Paginationtable';
import Emisor from './components/Emisor';
import CuentaBancaria from './components/CuentaBancaria';


export default function Home() {  

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const skips = (page-1)*perPage;
  
  const [Id,setId]=useState()
  const [Fecha,setFecha]=useState()
  const [Num_operacion,setNumop]=useState()
  const [Comprobante,setComprobante]=useState()
  const[Empresa,setEmpresa]=useState()
  const[Receptor,setReceptor]=useState()
  const[Monto,setMonto]=useState()
  const[Monto_recibido,setMontoRec]=useState()
  const [Movimiento,setMovimiento]=useState()
  const [Status,setStatus]=useState('Tenemos el dinero')
  const [Modo,setModo]=useState('asc')

  //console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  const { data: pagos1 } = usePagos(skips,perPage,Id,Fecha,Num_operacion,Comprobante,Empresa,Receptor,Monto,Monto_recibido,Movimiento,Status,Modo);
  console.log(pagos1)
  
  
  const {data:registros}= usePagos2(skips,perPage,Id,Fecha,Num_operacion,Comprobante,Empresa,Receptor,Monto,Monto_recibido,Movimiento,Status);
  
  var limmax=parseInt(registros/perPage)
  //console.log(registros+"   "+ limmax)
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
    if(page<=1){
      setPage(1)
    }
  }

  
  const nextPage=()=>{
    setPage(prevPage =>prevPage+1)
  }

    const Cambiarlimite=(e)=>{
        setPerPage(e.target.value)
        limmax=registros/e.target.value
        setPage((skips/e.target.value)+1)
    }

    const CambiarStatus=(e)=>{
      setStatus(e.target.value)
      setPage(1)
      console.log(e.target.value)
    }

    const handleID= e =>{
      setId(e.target.value)
      if(e.target.value===""){
        setId()
      }
      }
    
    const handleFecha=e=>{
      setFecha(e.target.value)
      if(e.target.galue===''){
        setFecha()
      }
    }

    const handleNumOper=e=>{
      setNumop(e.target.value)
      if(e.target.value===''){
        setNumop()
      }
    }
    const handlecomprobantepagado=e=>{
      setComprobante(e.target.value)
      if(e.target.value===''){
        setComprobante()
      }
    }
    const handleempresa=e=>{
      setEmpresa(e.target.value)
      if(e.target.value===''){
        setEmpresa()
      }
    }
    const handlereceptor=e=>{
      setReceptor(e.target.value)
      if(e.target.value===''){
        setReceptor()
      }
    }
    const handlemonto=e=>{
      setMonto(e.target.value)
      if(e.target.value===''){
        setMonto()
      }
    }

    const handlemontorecibido=e=>{
      setMontoRec(e.target.value)
      if(e.target.value===''){
        setMontoRec()
      }
    }
    const handlemovimiento=e=>{
      setMovimiento(e.target.value)
      if(e.target.value===''){
        setMovimiento()
      }
    }

    const CambiarModo=e=>{
      setModo(e.target.value)
    }


  return (
    <Styles>
      <Emisor/>
      <CuentaBancaria/>
      <p>
      <input type="text" onChange={handleID} id="ID" ></input>
      <input type="text" onChange={handleFecha} id="Fecha" ></input>
      <input type="text" onChange={handleNumOper} id="NumOper" ></input>
      <input type="text" onChange={handlecomprobantepagado} id="comprobantepagado" ></input>
      <input type="text" onChange={handleempresa} id="empresa" ></input>
      <select onChange={CambiarModo}>
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
      </select>
      <input type="text" onChange={handlereceptor} id="receptor" ></input>
      <input type="text" onChange={handlemonto} id="monto" ></input>
      <input type="text" onChange={handlemontorecibido} id="montorecibido" ></input>
      <input type="text" onChange={handlemovimiento} id="movimiento" ></input>

      

      <select onChange={CambiarStatus}>
            <option value='Tenemos el dinero'>Tenemos el dinero</option>
            <option value='Salvo buen cobro'>Salvo buen cobro</option>
            <option value='Tenemos documento'>Tenemos documento</option>
            <option value='Tenemos promesa de pago'>Tenemos promesa de pago</option>
            <option value='Ejercimos garantia'>Ejercimos garantia</option>
            <option value='Cancelado'>Cancelado</option>

        </select>
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
      <button onClick={() => nextPage()} disabled={limmax>page ? false:true}>
        Next page{" "}
      </button>
      Pagina {parseInt(page)} de {limmax}
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
