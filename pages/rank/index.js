import { useRouter } from "next/router"

export default function Page() {
  
  const router = useRouter()
  return ( 
  <>
    <button onClick={e => router.push('/rank/2')}>ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ</button>
  </>
  )
}