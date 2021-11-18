import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Provider from './application/provider';
function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();


  return (
    <>
    <Provider>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </Provider>
    </>
  )
}

export default MyApp
