import React from 'react';
import CuentaBancaria from './components/CuentaBancaria';
import Emisor from './components/Emisor';
import Paginado from './components/Paginado';

export default function Home() {  


  return (
    <div>
      <Emisor />
      <CuentaBancaria/>
      <Paginado></Paginado>
      </div>
  )
}



