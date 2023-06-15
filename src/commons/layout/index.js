import { useRouter } from "next/router";
import LayoutHeader from "./header/header";
import LayoutFooter from "./footer/footer";
import Sidebar from "./sidebar2";
import styled from "@emotion/styled";

// 변하지 않는 값은 밖에다가 써줌
const Main = [
    "/",
    "/login",
    "/register"
]

const layoutFunction = [
    "/login",
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
        <LayoutDiv>
            <Sidebar />
            <div style={{display: "flex", flexDirection:"column"}}>
            <LayoutHeader/>
            {props.children}
            <LayoutFooter />
            </div>
        </LayoutDiv>
    }
        </>
        
    )
}


