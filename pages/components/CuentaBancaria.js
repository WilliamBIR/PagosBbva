import React,{useState,useContext} from "react";
import {useQuery} from "react-query";
import {AppContext} from "../application/provider" 

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
    return misDatos
  }



export default function CuentaBancaria(){
    const [Emisor1,setEmisor1]=useContext(AppContext)
    const {data: misDatos}=useQuery(["misDatos",Emisor1.Movimiento2],fetchmisDatosRequest)
    
    const handleInputChange= e =>{   
        if(e.target.value.length===0){
            setEmisor1(prevEmisor1=>({
                ...prevEmisor1,
                ["Movimiento2"]:undefined
            }))
        }
        else{
            setEmisor1(prevEmisor1=>({
                ...prevEmisor1,
                ["Movimiento2"]:e.target.value
            }))
            }
                
        }

    return(
        <div>
            <p>Cuenta Bancaria: 
            <input type="text" onChange={handleInputChange} id="CuentaBancaria" list="listacuentabancaria" ></input>
            </p>
            <datalist id="listacuentabancaria">
            {misDatos && misDatos.map((Dato,i)=>{
                return(
                    <option  key={Dato.cuenta_bancaria_movimiento+i}>{Dato.cuenta_bancaria_movimiento} </option>
                )
            })}
            </datalist>
        </div>
    )

}