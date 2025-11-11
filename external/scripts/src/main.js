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
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    const style = document.createElement('style');
    style.innerText = `
        html[data-theme="dark"] {
            --ant-color-text-base: #ffffff !important;
            --ant-color-text: #ffffff !important;
            --ant-color-text-secondary: rgba(225, 225, 225, 0.85) !important;
            --ant-color-bg-container: #24242C !important;
            --ant-color-text-heading: rgba(225, 225, 225, 0.85) !important;
        }
        
        html[data-theme="dark"] {
            #header-row {
                background-color: #24242C !important;
                
                // .menu-item-label span,
                // .menu-item-label {
                //     color: white !important;
                // }
                //
                // .menu-item-label .custom-link {
                //     color: white !important;
                // }
                
                .submenu {
                    background-color: #24242C !important;
                }
                
                // .ant-space-item .visible-on-desktop > div {
                //     color: white !important;
                // }
                //
                // [aria-label="/where-to-buy"] {
                //     color: white !important;
                // }
                //
                // .name {
                //     color: white !important;
                // }
                //
                .btn-child span {
                    color: white !important;
                }
                //
                .basic-button-container {
                    color: white !important;
                }
                
                button:has(.ant-avatar) {
                    background: #24242C !important;
                    border-color: transparent !important;
                }
                
                
            }
            
            #section-row-6 {
                background-color: #3A3A41 !important;
            }
            
            .ant-select-dropdown {
                background: #24242C !important;
            }
                
            .ant-select-dropdown .ant-select-item {
                color: rgba(225, 225, 225, 0.85) !important;
            }
            
            // .ant-modal-content {
            //     background: #24242C !important;
            // }
                
            .ant-modal .ant-modal-header,
            .ant-modal .ant-modal-content,
            .ant-modal-close {
                background: #24242C !important;
            }
            
            .ant-modal .ant-modal-close {
                color: #ffffff !important;
                border-color: #ffffff !important;
            }
            
            .ant-modal .ant-modal-title {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-popover .ant-popover-inner {
                background: #24242C !important;
            }
            
            .ant-btn-variant-outlined:disabled {
                background: white !important;
            }
            
            .ant-picker-dropdown .ant-picker-panel-container {
                background: #24242C !important;
            }
            
            .ant-picker-dropdown .ant-picker-content th {
                color: var(--ant-color-text-secondary)!important;
            }
            
            #section-row-7 {
                background-color: #24242C !important;
            }
            
            
            
            #footer-row {
                background-color: #24242C !important;
            }
        }
    `;

    document.body.appendChild(style);
});