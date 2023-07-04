import { globalStyles } from "../src/commons/styles/globalStyle"
import { Global } from '@emotion/react'
import LayoutPage from "../src/commons/layout"
import { AuthProvider } from "../src/components/AuthContext/AuthContext"
import { useLoading } from "../src/commons/useLoading/useLoading"
import { LoadingSpinner } from "../src/components/LoadingSpinner/LoadingSpinner"
export default function App({ Component, pageProps }) {
  const isLoading = useLoading()  

  return (
    <>
      <Global styles={globalStyles} />
      <AuthProvider>
      <LayoutPage>
      {isLoading ? <LoadingSpinner /> : null} 
      <Component {...pageProps} />
      </LayoutPage>
      </AuthProvider>
    </>
  );
}
