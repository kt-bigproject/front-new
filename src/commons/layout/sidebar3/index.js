import styles from './styles.module.css';
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Icon from '@leafygreen-ui/icon';
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import styled from '@emotion/styled';

const CustomSideNav = styled(SideNav)`
  height: 100vh;
`

export default function Sidebar() {
  const a1 = useRouter();
  const onClickbutton1 = () => {
    a1.push('/practice');
  };
  const a2 = useRouter();
  const onClickbutton2 = () => {
    a2.push('/game');
  };

  const a3 = useRouter();
  const onClickbutton3 = () => {
    a3.push('/bpost');
  };

  const a4 = useRouter();
  const onClickbutton4 = () => {
    a4.push('/qpost');
  };

  const a5 = useRouter();
  const onClickbutton5 = () => {
    a5.push('/rank');
  };

  const a6 = useRouter();
  const onClickbutton6 = () => {
    a6.push('/login');
  };

  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.sidebarContainer}>
      <nav aria-label="Side Navigation">
      <CustomSideNav widthOverride={expanded ? 300 : 60} aria-label="Side Navigation">
        <img src="/Logo.svg" className={styles.ti} width={300} height={66} />

        <div className={styles.sidebarItems}>
          <span className={styles.l1} onClick={onClickbutton1}>
            <i className={`bx bx-edit-alt ${expanded ? styles.icon1 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>낙서장</span>
            {!expanded && <span className={styles.tooltip}>낙서장</span>}
          </span>
          <span className={styles.l2} onClick={onClickbutton2}>
            <i className={`bx bx-joystick ${expanded ? styles.icon2 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>놀이터</span>
          </span>
          <span className={styles.l3} onClick={onClickbutton3}>
            <i className={`bx bx-like ${expanded ? styles.icon3 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>자랑하기</span>
          </span>
          <span className={styles.l4} onClick={onClickbutton4}>
            <i className={`bx bx-chat ${expanded ? styles.icon4 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>문의하기</span>
          </span>
          <span className={styles.l5} onClick={onClickbutton5}>
            <i className={`bx bx-trophy ${expanded ? styles.icon5 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>랭킹</span>
          </span>
          <span className={styles.l6} onClick={onClickbutton6}>
            <i className={`bx bx-log-out ${expanded ? styles.icon6 : styles.hidden}`}></i>
            <span className={expanded ? styles.text : styles.hidden}>로그아웃</span>
          </span>
        </div>
      </CustomSideNav>
      </nav>
    </div>
  );
}