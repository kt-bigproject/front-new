import { useRouter } from "next/router";
import LayoutFooter from "./footer/footer";

// 변하지 않는 값은 밖에다가 써줌
// 변하지 않는 값은 밖에다가 써줌
const Main = [
    "/",
    "/login",
    "/register",
    "/#part-1",
    "/#part-2",
    "/#part-3",
    "/#part-4",
    "/#part-5",
]

export default function Layout(props) {

    const router = useRouter()

    const isMain = Main.includes(router.asPath);
    return (
        <>
        {isMain? 
        <>
        {props.children}
        <LayoutFooter />
        </>
        : 
            <>
              <div style={{backgroundImage: "url('/main/Noise.png')", backgroundSize: "100% 100%", backgroundColor: '#faf0e6'}}>
                {props.children}
              </div>
            <LayoutFooter />
            </>  
        }
        </>
        
    )
}

