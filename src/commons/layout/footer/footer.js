import styles from './styles.module.css';
import React from 'react';
import 'boxicons/css/boxicons.min.css';


export default function LayoutFooter() {
  return (
            <footer className={styles.wrap}>
              <div className="block lg:flex py-12">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center mb-6 md:text-left">
                </div>
                <div className="w-full">
                </div>
              </div>
          <div className="bg-gray-200">
                <div className="py-4 px-6 flex flex-wrap flex-col sm:flex-row">
                  <p className={styles.kt}>Copyright© KT 에이블스쿨 </p>
                  <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                  <img src="/Logo.svg" className={styles.logo} width={200} height={50} />
              <div className={styles.container}>  
                <div className={styles.flex}>
                  <a href="https://www.instagram.com" target="_blank">
                      <i className='bx bxl-instagram' style={{ cursor: 'pointer', color: 'navy'}}></i>
                      </a> 
                  <a href="https://www.facebook.com" target="_blank">
                      <i className='bx bxl-facebook' style={{ cursor: 'pointer', color: 'navy'}}></i>
                      </a>
                  <a href="https://www.twitter.com" target="_blank">
                      <i className='bx bxl-twitter' style={{ cursor: 'pointer', color: 'navy'}}></i>
                      </a>
                  </div>
              </div>  
              </span>
                </div>
          </div>
        </footer>
);
}