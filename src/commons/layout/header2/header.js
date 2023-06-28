import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import styles from './styles.module.css'
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import  { useEffect, useState, useContext } from 'react'
import AuthContext from '../../../../src/components/AuthContext/AuthContext';
import Link from 'next/link';
export default function LayoutHeader() {


  const {user, logoutUser} = useContext(AuthContext)

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
    a5.push('/')
  }

  const a6 = useRouter()

  const onClickbutton6 = () => {
    a6.push('/login')
  }



  const logout = () => {
    logoutUser()
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
    <>
    <header className={`${styles.header} ${showHeader ? styles.showHeader : styles.hideHeader}`}>
      <div className={`${styles.lowerSection} `}>  
        <img src="/logo.png" width='100' style={{padding: "10px 10px", cursor:"pointer"}} onClick={onClickbutton5}></img>
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
        {user ? (
          <>
            <div className={styles.logout} onClick={logout}>로그아웃</div>
          </>
        ) : (
          <>
            <div className={styles.logout} onClick={onClickbutton6}>로그인</div>
          </>
        )}
      </div>
    </header>
    </>
  );
}
  
  
  