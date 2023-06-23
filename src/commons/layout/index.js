import { useRouter } from "next/router";
import LayoutHeader from "./header/header";
import LayoutFooter from "./footer/footer";
// import Sidebar from "./sidebar3";
import styled from "@emotion/styled";
import { useState } from 'react';

// 변하지 않는 값은 밖에다가 써줌
// 변하지 않는 값은 밖에다가 써줌
const Main = [
    "/",
    "/login",
    "/register"
]

const layoutFunction = [
    // "/login",
]


const LayoutDiv = styled.div`
display: flex;
flex-direction: row;
`


export default function Layout(props) {

    const router = useRouter()

    const isMain = Main.includes(router.asPath);
    const isFunction = layoutFunction.includes(router.asPath);
    return (
        <>
        {isMain? 
        <>
        {props.children}
        </>
        : 
        
         
            
            <>
            <LayoutHeader/>
<<<<<<< HEAD
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{ width: "1200px", paddingTop: '10px', paddingBottom: '30px', height: "auto"}}>{props.children}</div>
            </div>
=======
            {props.children}
>>>>>>> final-h-f
            <LayoutFooter />
            </>  
        
    }
        </>
        
    )
}

