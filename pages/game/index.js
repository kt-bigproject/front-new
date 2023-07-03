import Gamepage from "../../src/components/game/gamecontainer"
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import AuthContext from "../../src/components/AuthContext/AuthContext";
import { useAxios } from "../../src/components/Axios/axios";

export default function Game3() {
  const [ sent, setSent ] = useState("")
  const api = useAxios()
  const router = useRouter();
  const stage = '음절'
  let { count, setCount, authTokens,  } = useContext(AuthContext)
  
  useEffect(() => {
    const Fetchsentence = async () => {
      const result = await api.get('/game/syllable/')
      const random = Math.floor(Math.random() * result.data['length'])
      setSent(result.data[random].syllable)
    }
    Fetchsentence()
  }, [])

  const NextLevel = () => {
    router.push(router.route + "/2");
    setCount(count+1)
  };
  console.log(authTokens)

  return <Gamepage NextLevel={NextLevel} sent={sent} stage={stage}/>;
}

