import styles from './styles.module.css';
import React from 'react';
import 'boxicons/css/boxicons.min.css';


export default function LayoutFooter() {
  return (
    <footer className={styles.footerwrap}>
     <div className={styles.container1}>
      <div className={styles.up}>
        <img src="/Logo.svg" className={styles.logo} width={190} height={62} />
        <p className={styles.text}>
              오늘의 손글씨에 오신 것을 환영합니다!<br/>
              오늘의 손글씨는 만 13세 미만의 어린이와 외국인을 대상으로 손글씨 학습을 제공하는 사이트입니다.<br/> 
              손글씨를 연습하고 개선하며 창의적인 작품을 만들어보세요.
            </p>
      </div>
     </div>
      <div className={styles.line}></div> 
     <div className={styles.container2}>
        <div className={styles.iconwrap}>
          <a href="https://www.instagram.com" target="_blank">
          <i className='bx bxl-instagram' style={{ color: 'navy' }}></i>
          </a> 
          <a href="https://www.facebook.com" target="_blank"> 
          <i className='bx bxl-facebook' style={{ color: 'navy' }}></i>
          </a>
          <a href="https://www.twitter.com" target="_blank">
          <i className='bx bxl-twitter' style={{ color: 'navy' }}></i>
          </a>
        </div>
        <div className={styles.text2}>© KT 에이블스쿨. All rights reserved.</div>
        <div className={styles.text3}>
        <span>개인정보 처리방침</span><span>이용약관</span>
        </div>
      </div> 
      
      
      </footer>
  );
}