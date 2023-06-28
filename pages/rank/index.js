import { useRouter } from "next/router"
import Secure from "@../../../src/components/Secure/secure"

export default function Page() {
  
  const router = useRouter()
  return ( 
  <>
    <button onClick={e => router.push('/rank/2')}>ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ</button>
    <Secure />
  </>
  )
}