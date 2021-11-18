import {createContext,useState} from 'react';


export default ({ children }) =>{
    const [Emisor1,setEmisor1] = useState({
        Emisor2:undefined,Movimiento2:undefined
    });
    return (            
            <AppContext.Provider value={[Emisor1,setEmisor1]}>
                {children}
            </AppContext.Provider>  
    );
}

export const AppContext = createContext();