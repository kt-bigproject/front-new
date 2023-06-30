import styles from './styles.module.css'
import 'boxicons/css/boxicons.min.css';
import { useRouter } from 'next/router';
import  { useContext } from 'react'
import AuthContext from '../../../../src/components/AuthContext/AuthContext';
export default function LayoutHeader() {

  const {user, logoutUser} = useContext(AuthContext)

  const router = useRouter()

  const onClickbutton1 = () => {
    router.push('/practice')
  }

  const onClickbutton2 = () => {
    router.push('/game')
  }

  const onClickbutton3 = () => {
    router.push('/bpost')
  }

  const onClickbutton4 = () => {
    router.push('/qpost')
  }
  const onClickbutton5 = () => {
    router.push('/')
  }

  const onClickbutton6 = () => {
    router.push('/login')
  }

  const logout = () => {
    logoutUser()
  }
 
  return (
    <>
    <header className={`${styles.header} `}>
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
  
  
  