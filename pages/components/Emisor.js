import axios from "axios";
import React,{useState,useContext} from "react";
import {useQuery, useMutation, queryCache, QueryClient} from "react-query";
import CuentaBancaria from "./CuentaBancaria";


const fetchmisDatosRequest = async(User)=>{
    const data2={Otro:User}
    const response= await fetch('../api/obteneremisor',{
        body:JSON.stringify(data2),
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
    })
    const data= await response.json()
    const {misDatos}=data;
    //console.log("query")
    //console.log(misDatos)
    return misDatos
  }



export default function Emisor(){
    const[User,setUser]=useState('')
    const[ListaUsuarios,setUsuarios]=useState([])
    const[ControlLista,setControl]=useState(0)
    const[Mensaje,setMensaje]=useState('')
    const Limite=5
    const {data: misDatos}=useQuery(["misDatos",User],fetchmisDatosRequest)
 
    const handleInputChange= e =>{   
        setMensaje('')
        setUsuarios(misDatos)              
        //console.log("asd")
        //console.log(ListaUsuarios) 
        setUser(e.target.value);
        if(e.target.value.length===0){
            document.getElementById('ListaUs').style.display='none';
            setUsuarios([]);

        }
        else{
            document.getElementById('ListaUs').style.display='list-item';
            setUser(e.target.value)
            //BuscaUsuario(e.target.value)
            }
                
        }



        const Teclapresionada=(e)=>{
            if(e.key==='ArrowDown' &&ControlLista<Limite ){
                setControl(prevControl =>prevControl+1)
                if(ControlLista>Limite-1){
                    setControl(Limite-1)
                }
            }
            else if(e.key==='ArrowUp' &&ControlLista>0){
                setControl(prevControl =>prevControl-1)
            }
            else if(e.key==="Enter"){
          //      console.log(misDatos[ControlLista].Nombre)
                setUser(misDatos[ControlLista].empresa_nombre)
                setControl(0)
                document.getElementById('ListaUs').style.display='none'; 

            }
            }
    
            const Clickenopciones=tabla=>{
                document.getElementById('ListaUs').style.display='none';
                setMensaje('')
                setUser(tabla);
                setControl(0)
            }
        
    

    return(
        <div>
            Emisor: 
            <input onChange={handleInputChange} onKeyDown={Teclapresionada}   value={User} id="Usuarios" name="usuarios" type="search" placeholder="Search" ></input>
            {Mensaje}
            <ul id="ListaUs" style={{display:"none"}}>
            {misDatos && misDatos.map((Dato,i)=>{
                return(
                    <li  key={Dato.empresa_nombre+i} onClick={()=>Clickenopciones(Dato.empresa_nombre)} value={Dato.empresa_nombre}   style={{display: i<=Limite ? "list-item":"none", background: i===ControlLista ? "aquamarine":"white"}}>{Dato.empresa_nombre} </li>
                )
            })}
            </ul>
        </div>
    )

}