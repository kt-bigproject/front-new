import styled from "@emotion/styled"
import Link from "next/link"
import { UserOutlined } from "@ant-design/icons"
import React from 'react';
import styles from './styles.module.css'
// import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import { useState } from 'react';



export default function LayoutHeader() {
    const h1 = useRouter();
    const onClickButton = () => {
      h1.push('./login');
    };
  
  
    return (
      <header className={styles.wrap}>
        <img src="/Logo.svg" className={styles.title} width={200} height={62} />
        <i className='bx bx-user-circle' style={{ cursor: 'pointer', color: 'gray', fontSize: 44 }}></i>
        <button className={styles.logout} onClick={onClickButton}>로그아웃
        </button>
      </header>
    );
  }
  
  
  