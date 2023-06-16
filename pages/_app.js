import { globalStyles } from "../src/commons/styles/globalStyle"
import { Global } from '@emotion/react'
import LayoutPage from "../src/commons/layout"
import { AuthProvider } from "../src/components/AuthContext/AuthContext"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Global styles={globalStyles}/>
      <AuthProvider>
      <LayoutPage>
      <Component {...pageProps} />
      </LayoutPage>
      </AuthProvider>
    </>
  )
}
