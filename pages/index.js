import React from 'react';
import {useState,useContext} from 'react'
import usePagos from './hooks/usePagos';
import usePagos2 from './hooks/usePagos2';
import PaginationQueryTable from './components/PaginationQueryTable';
import CuentaBancaria from './components/CuentaBancaria';
import Emisor from './components/Emisor';
import { AppContext } from './application/provider';

export default function Home() {  

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const skips = (page-1)*perPage;
  const [Emisor1,setEmisor1] = useContext(AppContext)
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
  console.log(Emisor1)
  //console.log('page='+page+ ' perPage='+perPage+' skips='+skips);
  const { data: pagos1 } = usePagos(skips,perPage,Id,Fecha,Num_operacion,Comprobante,Emisor1.Emisor2,Receptor,Monto,Monto_recibido,Emisor1.Movimiento2,Status,Modo);
  //console.log(pagos1)
  console.log(page+ "   "+ limmax)
  
  const {data:registros}= usePagos2(skips,perPage,Id,Fecha,Num_operacion,Comprobante,Emisor1.Emisor2,Receptor,Monto,Monto_recibido,Emisor1.Movimiento2,Status);
  
  var limmax=Math.floor(registros/perPage)
  console.log(page+ "   "+ limmax)
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
        const aux=(skips/e.target.value)+1
        setPage(Math.floor(aux))
        if(aux<1){
        setPage(1)
      }
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
      setEmisor1(prevEmisor1=>({
        ...prevEmisor1,
        ["Emisor2"]:e.target.value
      }))
      if(e.target.value===''){
        setEmpresa()
        setEmisor1(prevEmisor1=>({
          ...prevEmisor1,
          ["Emisor2"]:undefined
      }))
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
      setEmisor1(prevEmisor1=>({
        ...prevEmisor1,
        ["Movimiento2"]:e.target.value
    }))
      if(e.target.value===''){
        setMontoRec()
        setEmisor1(prevEmisor1=>({
          ...prevEmisor1,
          ["Movimiento2"]:undefined
      }))
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
    <div>
      
      <Emisor />
      <CuentaBancaria />
      <p>
      <input type="text" onChange={handleID} className="ID" ></input>
      <input type="text" onChange={handleFecha} className="Fecha" ></input>
      <input type="text" onChange={handleNumOper} className="NumOper" ></input>
      <input type="text" onChange={handlecomprobantepagado} className="comprobantepagado" ></input>
      <input type="text" onChange={handleempresa} className="empresa" ></input>
      <select onChange={CambiarModo}className="Ascendente">
            <option value='asc'>Ascendente</option>
            <option value='desc'>Descendente</option>
      </select>
      <input type="text" onChange={handlereceptor} className="receptor" ></input>
      <input type="text" onChange={handlemonto} className="monto" ></input>
      <input type="text" onChange={handlemontorecibido} className="montorecibido" ></input>
      <input type="text" onChange={handlemovimiento} className="movimiento" ></input>

      

      <select onChange={CambiarStatus} className="Status">
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
      <button onClick={() => nextPage()} disabled={limmax>=page ? false:true}>
        Next page{" "}
      </button>
      Pagina {parseInt(page)} de {limmax}
      
      </div>
  )
}



