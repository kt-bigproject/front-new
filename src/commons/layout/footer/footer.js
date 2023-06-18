import styles from './styles.module.css';
import React from 'react';
import 'boxicons/css/boxicons.min.css';


export default function LayoutFooter() {
  return (
            <footer class="text-gray-700" className={styles.wrap}>
              <div class="block lg:flex py-12">
                <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center mb-6 md:text-left">
                </div>
                <div class="w-full">
                </div>
              </div>
          <div class="bg-gray-200">
                <div class="py-4 px-6 flex flex-wrap flex-col sm:flex-row">
                  <p class="text-gray-500 text-sm text-center sm:text-left" className={styles.kt}>© KT 에이블스쿨 </p>
                  <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
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
                <a class="text-gray-500">
                  {/* {% include "@atoms/svg/_svg--icon.twig" with {
                    icon: "facebook",
                    size: 'small',
                  } only %} */}
                </a>
                <a class="ml-3 text-gray-500">
                  {/* {% include "@atoms/svg/_svg--icon.twig" with {
                    icon: "instagram",
                    size: 'medium',
                  } only %} */}
                </a>
                <a class="ml-3 text-gray-500">
                  {/* {% include "@atoms/svg/_svg--icon.twig" with {
                    icon: "twitter",
                    size: 'medium',
                  } only %} */}
                </a>
                <a class="ml-3 text-gray-500">
                  {/* {% include "@atoms/svg/_svg--icon.twig" with {
                    icon: "linkedin",
                    size: 'medium',
                  } only %} */}
                </a>
              </span>
                </div>
          </div>
        </footer>
);
}