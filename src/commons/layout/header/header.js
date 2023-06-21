import styled from "@emotion/styled"
import Link from "next/link"
import { UserOutlined } from "@ant-design/icons"
import React from 'react';
import styles from './styles.module.css'
// import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function LayoutHeader() {
  const a1 = useRouter()

  const onClickbutton1 = () => {
    a1.push('/practice')
  }

  const a2 = useRouter()

  const onClickbutton2 = () => {
    a2.push('/game')
  }
  const a3 = useRouter()

  const onClickbutton3 = () => {
    a3.push('/bpost')
  }
  const a4 = useRouter()

  const onClickbutton4 = () => {
    a4.push('/qpost')
  }
  const a5 = useRouter()

  const onClickbutton5 = () => {
    a5.push('/rank')
  }

  const a6 = useRouter()

  const onClickbutton6 = () => {
    a6.push('/login')
  }




  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <header className={`${styles.headerwrap} ${scrolled ? styles.scrolled : ''}`}>
      <img src="/Logo.svg" className={styles.title1} width={190} height={62} />
      <div className={styles.headcontainer}>
        <span className={styles.n1} onClick={onClickbutton1}>낙서장</span>
        <span className={styles.n2} onClick={onClickbutton2}>놀이터</span>
        <span className={styles.n3} onClick={onClickbutton3}>자랑하기</span>
        <span className={styles.n4} onClick={onClickbutton4}>문의하기</span>
        <span className={styles.n5} onClick={onClickbutton5}>랭킹</span>
      </div>
      <div className={styles.headcontainer2}>
        <button className={styles.b1} onClick={onClickbutton6}>로그아웃</button>
      </div>
    </header>
  );
}
  
  
  