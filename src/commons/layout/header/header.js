import styled from "@emotion/styled"
import Link from "next/link"
import styles from '../../../../styles/header/header.module.scss'
import {LoginOutlined} from '@ant-design/icons'
import { UsergroupAddOutlined } from "@ant-design/icons"


const LayoutHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.contents}>
            <div >
                <Link href="/"><img width={100} src={`/ogleogle.png.jpg`} className="Logo"/></Link>
            </div>
            <div className={styles.sign}>
                <ul>
                    <li>
                    <Link href="/login"><LoginOutlined /></Link>
                    </li>
                    <li>
                    <Link href="/register"><UsergroupAddOutlined /></Link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        
    )
}

export default LayoutHeader
