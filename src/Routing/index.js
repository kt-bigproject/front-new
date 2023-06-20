import { useRouter } from "next/router"
import { useContext } from "react"
// import AuthContext from "../src/components/AuthContext/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pages from "../../pages/main/index"
import Home from '../../pages/Home'
import Check from "../../pages/boardcheck/[number]/index"


export default function Routing() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Pages />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/boardcheck/:id" element={Check} />                    
                </Routes>
            </BrowserRouter>
        </div>
    );
}