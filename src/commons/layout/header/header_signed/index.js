import styled from "@emotion/styled"
import Link from "next/link"
import styles from '../../../../styles/header/header.module.scss'
import { UserOutlined } from "@ant-design/icons"

const LayoutHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.contents}>
            <div >
                <Link href="/"><img height={20} src={`/ogleogle.png`} className="Logo"/></Link>
            </div>
            <div className={styles.sign}>
                <ul>
                    <li>
                    <Link href="/profile"><UserOutlined /></Link>
                    </li>
                </ul>
            </div>
            </div>
        </div>
        
    )
}

export default LayoutHeader
