import React,{useContext} from "react";
import {useQuery} from "react-query";
import {AppContext} from "../application/provider" 


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
    return misDatos
  }



export default function Emisor(){
    const [Emisor1,setEmisor1]= useContext(AppContext)
    const {data: misDatos}=useQuery(["misDatos",Emisor1.Emisor2],fetchmisDatosRequest)
    
    const handleInputChange= e =>{   
        if(e.target.value.length===0){
            setEmisor1(prevEmisor1=>({
                ...prevEmisor1,
                ["Emisor2"]:undefined
            }))
        }
        else{
            setEmisor1(prevEmisor1=>({
                ...prevEmisor1,
                ["Emisor2"]:e.target.value
            }))
            }
                
        }
    

    return(
        <div>
            Emisor: 
            <input onChange={handleInputChange}   id="Emisor" type="text" list="listaemisor"  ></input>
            <datalist id="listaemisor" style={{display:"none"}}>
            {misDatos && misDatos.map((Dato,i)=>{
                return(
                    <option  key={Dato.empresa_nombre+i} >{Dato.empresa_nombre} </option>
                )
            })}
            </datalist>
        </div>
    )

}