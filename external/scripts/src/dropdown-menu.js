async function hostReactAppReady(selector = '#__next > div', timeout = 500) {
    return new Promise(resolve => {
        const waiter = () => {
            const host_el = document.querySelector(selector);
            if (host_el?.getBoundingClientRect().height) {
                resolve();
            } else {
                setTimeout(waiter, timeout);
            }
        };
        waiter();
    });
}

hostReactAppReady().then(() => {
    if (window.innerWidth > 768) {
        const dropStyle = document.createElement('style');
        dropStyle.textContent = `
            .menu-dropdown-item {
                transition: 0.2s linear;
                display: flex;
                align-items: center;
                gap: 8px;
            }
        
            .menu-dropdown-item:hover {
                background-color: rgba(0, 0, 0, 0.05);
                border-radius: 6px;
            }
            
            svg {
                transition: 0.2s linear;
            }
            
            .menu-dropdown-item:hover svg {
                transform: rotate(180deg);
            }
        `;

        document.head.append(dropStyle);

        document.querySelectorAll('.basic-menu .basic-menu-item').forEach(item => {
            const submenu = item.querySelector('.submenu');

            if (submenu) {
                item.classList.add('menu-dropdown-item');
                submenu.style.width = '240px';

                const label = item.querySelector('.menu-item-label');
                if (label) {
                    label.insertAdjacentHTML('afterend', `
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.94055 0.384995C1.15751 0.168037 1.50927 0.168037 1.72622 0.384995L5.77783 4.4366L9.82944 0.384995C10.0464 0.168037 10.3982 0.168037 10.6151 0.384995C10.8321 0.601953 10.8321 0.953711 10.6151 1.17067L6.17067 5.61511C5.95371 5.83207 5.60195 5.83207 5.38499 5.61511L0.94055 1.17067C0.723593 0.953711 0.723593 0.601953 0.94055 0.384995Z"
                        fill="#535353"/>
                    </svg>
                  `);
                }

                submenu.querySelectorAll('.menu-item-label').forEach(label => {
                    label.style.lineHeight = '20px';
                });
            }
        });
    }
});