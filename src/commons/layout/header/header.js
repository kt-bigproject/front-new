import styled from "@emotion/styled"
import Link from "next/link"
import { UserOutlined } from "@ant-design/icons"
// import React from 'react';
import styles from './styles.module.css'
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import  { useEffect, useState } from 'react'
// import ReactTooltip from 'react-tooltip';




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
 

  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = currentScrollPos > prevScrollPos;

      setShowHeader(!isScrolledDown);
      prevScrollPos = currentScrollPos;

      console.log('Scroll event occurred');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  
  return (
    <header className={`${styles.header} ${showHeader ? styles.showHeader : styles.hideHeader}`}>
      <div className={styles.upperSection}>
        <div className={styles.logoContainer}>
          <img src="/Logo.svg" className={styles.title1} width={190} height={62} />
        </div>
      </div>
      <div className={`${styles.lowerSection} `}>  
      <div className={styles.menuContainer}>
          <span className={styles.menuItem} onClick={onClickbutton1}>
            <i className='bx bxs-edit-alt' ></i>낙서장
            </span>
          <span className={styles.menuItem} onClick={onClickbutton2}>
            <i className='bx bx-joystick' ></i>놀이터</span>
          <span className={styles.menuItem} onClick={onClickbutton3}>
            <i className='bx bx-like' ></i>자랑하기</span>
          <span className={styles.menuItem} onClick={onClickbutton4}>
            <i className='bx bx-message-dots' ></i>문의하기</span>
          <span className={styles.menuItem} onClick={onClickbutton5}>
            <i className='bx bx-trophy' ></i>랭킹</span>
      </div>
      <div className={styles.logoutContainer}>
          <button className={`${styles.logoutItem} ${styles.alignRight}`} onClick={onClickbutton6}>로그아웃</button>
      </div>
    </div>
    </header>
  );
}
  
  
  