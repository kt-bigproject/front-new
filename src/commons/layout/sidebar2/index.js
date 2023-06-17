import styles from './styles.module.css';
<<<<<<< HEAD

const CustomSideNav = styled(SideNav)`
  /* height: 100vh; */
  font-size: 30px;
`
=======
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
>>>>>>> sidebar-0616

export default function Sidebar() {
  const a1 = useRouter();
  const onClickbutton1 = () => {
    a1.push('./practice');
  };

  const a2 = useRouter();
  const onClickbutton2 = () => {
    a2.push('./game');
  };

  const a3 = useRouter();
  const onClickbutton3 = () => {
    a3.push('./bpost');
  };

  const a4 = useRouter();
  const onClickbutton4 = () => {
    a4.push('./qpost');
  };

  const a5 = useRouter();
  const onClickbutton5 = () => {
    a5.push('./rank');
  };

  const a6 = useRouter();
  const onClickbutton6 = () => {
    a6.push('./login');
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [logoVisible, setLogoVisible] = useState(true);
  const [imagePosition, setImagePosition] = useState(0);
  

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
    setLogoVisible(!logoVisible);
    setTimeout(() => {
      if (sidebarExpanded) {
        setImagePosition(-182); 
      } else {
        setImagePosition(0); 
      }
    }, 90); 

    
    const transitionDuration = sidebarExpanded ? '0.3s' : '0.3s'; 
    const transitionStyle = `width ${transitionDuration} ease-in-out, transform ${transitionDuration} ease-in-out`;
    setSidebarTransition(transitionStyle);
  };

  const [sidebarTransition, setSidebarTransition] = useState('width 0.3s ease-in-out');

<<<<<<< HEAD
  return(
  <CustomSideNav
    // widthOverride={500}
  >
    <SideNavItem>Overview</SideNavItem>
    <SideNavItem>Introduction</SideNavItem>
    <SideNavItem>
      Android SDK
      <SideNavItem><div className={styles.name}>Install MongoDB Community Edition</div></SideNavItem>
      <SideNavGroup
        header="Fundamentals"
        collapsible
        glyph={<Icon glyph="Building" />}
      >
        <SideNavItem active>
          Upgrade MongoDB Community to MongoDB Enterprise
        </SideNavItem>
        <SideNavItem>Verify Integrity of MongoDB Packages</SideNavItem>
        <SideNavGroup header="Preferences">
          <SideNavItem>Privacy</SideNavItem>
          <SideNavItem>Security</SideNavItem>
        </SideNavGroup>
      </SideNavGroup>
    </SideNavItem>
  </CustomSideNav>
);
=======
  return (
    <aside
      className={`${styles.Sidebar} ${sidebarExpanded ? styles.Expanded : styles.Collapsed}`}
      style={{ width: sidebarExpanded ? '250px' : '70px', transition: sidebarTransition }}
    >
      <div className={styles.sidebarContent}>
        <div className={`${styles.logoContainer} ${styles.flexContainer}`}>
          {logoVisible && (
            <img
              src="/ti.svg"
              className={`${styles.logo} ${styles.flexItem}`}
              width={200}
              height={90}
            />
          )}
          <img
            src="/right.png"
            width={40}
            height={30}
            onClick={toggleSidebar}
            className={`${styles.right} ${styles.flexItem}`}
            style={{ transform: `translateX(${imagePosition}px)` }}
          />
        </div>
        <div className={`${styles.sidebarArrow} ${sidebarExpanded ? styles.ArrowExpanded : styles.ArrowCollapsed}`}>
        </div>
        <li className={styles.l1}>
          <i className={`bx bx-edit-alt ${styles.editIcon1}`}></i>
          <span
            className={`${styles.t1} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton1}
          >
            낙서장
          </span>
        </li>
        <li className={styles.l2}>
          <i className={`bx bx-joystick ${styles.editIcon2}`}></i>
          <span
            className={`${styles.t2} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton2}
          >
            놀이터
          </span>
        </li>
        <li className={styles.l3}>
          <i className={`bx bx-like ${styles.editIcon3}`}></i>
          <span
            className={`${styles.t3} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton3}
          >
            자랑하기
          </span>
        </li>
        <li className={styles.l4}>
          <i className={`bx bx-chat ${styles.editIcon4}`}></i>
          <span
            className={`${styles.t4} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton4}
          >
            문의하기
          </span>
        </li>
        <li className={styles.l5}>
          <i className={`bx bx-trophy ${styles.editIcon5}`}></i>
          <span
            className={`${styles.t5} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton5}
          >
            랭킹
          </span>
        </li>
        <li className={styles.l6}>
          <i className={`bx bx-log-out ${styles.editIcon6}`}></i>
          <span
            className={`${styles.t6} ${sidebarExpanded ? styles.TextExpanded : styles.TextCollapsed}`}
            onClick={onClickbutton6}
          >
            로그아웃
          </span>
        </li>
      </div>
    </aside>
  );
>>>>>>> sidebar-0616
}