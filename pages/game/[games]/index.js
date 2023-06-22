import Gamepage from "../../../src/components/game/gamecontainer"
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react"
import axios from "axios";
import AuthContext from "../../../src/components/AuthContext/AuthContext";
import { useAxios } from "../../../src/components/Axios/axios";

export default function Game3() {
  const [ sent, setSent ] = useState("")
  const api = useAxios()
  const router = useRouter();
  let { count, setCount } = useContext(AuthContext)
  useEffect(() => {
    const Fetchsentence = async () => {
      const result = await api.get('/game/word/')
      const random = Math.floor(Math.random() * result.data['length'])
      setSent(result.data[random].word)
    }
    Fetchsentence()
  }, [])

  const NextLevel = () => {
    router.push(router.route + "/3");
    setCount(count+1)
  };

  return <Gamepage NextLevel={NextLevel} sent={sent}/>;
}

