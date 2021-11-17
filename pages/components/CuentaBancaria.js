import axios from "axios";
import React,{useState,useContext} from "react";
import {useQuery, useMutation, queryCache, QueryClient} from "react-query";


const fetchmisDatosRequest = async(User)=>{
    const data2={Otro:User}
    const response= await fetch('../api/obtenercuenta',{
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



export default function CuentaBancaria(){
    const[User,setUser]=useState('')
    const[ListaUsuarios,setUsuarios]=useState([])
    const[ControlLista,setControl]=useState(0)
    const[Mensaje,setMensaje]=useState('')
    const Limite=5
    const {data: misDatos}=useQuery(["misDatos",User],fetchmisDatosRequest)
 
    const handleInputChange= e =>{   
        setMensaje('')
        setUsuarios(misDatos)              
        setUser(e.target.value);
        console.log(e.target.value.type)
        if(e.target.value.length===0){
            document.getElementById('ListaCu').style.display='none';
            setUsuarios([]);

        }
        else{
            document.getElementById('ListaCu').style.display='list-item';
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
                document.getElementById('ListaCu').style.display='none'; 

            }
            }
    
            const Clickenopciones=tabla=>{
                document.getElementById('ListaCu').style.display='none';
                setMensaje('')
                setUser(tabla);
                setControl(0)
            }
        
    

    return(
        <div>
            <p>Cuenta Bancaria: 
            <input type="text" onChange={handleInputChange} onKeyDown={Teclapresionada}   value={User} id="Usuarios" name="usuarios"  placeholder="Search" ></input>
            {Mensaje}</p>
            <ul id="ListaCu" style={{display:"none"}}>
            {misDatos && misDatos.map((Dato,i)=>{
                return(
                    <li  key={Dato.cuenta_bancaria_movimiento+i} onClick={()=>Clickenopciones(Dato.cuenta_bancaria_movimiento)} value={Dato.cuenta_bancaria_movimiento}   style={{display: i<=Limite ? "list-item":"none", background: i===ControlLista ? "aquamarine":"white"}}>{Dato.cuenta_bancaria_movimiento} </li>
                )
            })}
            </ul>
        </div>
    )

}