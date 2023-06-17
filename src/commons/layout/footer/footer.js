import styles from './styles3.module.css';
import React from 'react';



export default function LayoutFooter() {
  return (
            <footer class="text-gray-700" className={styles.wrap}>
              <div class="block lg:flex py-12">
                <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center mb-6 md:text-left">
                  <p class="mt-2 text-sm text-gray-500">Air plant banjo lyft occupy retro</p>
                </div>
                <div class="w-full">
                </div>
              </div>
          <div class="bg-gray-200">
                <div class="py-4 px-6 flex flex-wrap flex-col sm:flex-row">
                  <p class="text-gray-500 text-sm text-center sm:text-left">© 2020 tailblocks —
                    <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1"
                      target="_blank">@knyttneve</a>
                  </p>
                  <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
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