import { useRouter } from "next/router"
import confetti from "canvas-confetti"

export default function Page() {
  const onClcikButton = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  const router = useRouter()
  return ( 
  <>
    <button onClick={onClcikButton}>ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ</button>
  </>
  )
}