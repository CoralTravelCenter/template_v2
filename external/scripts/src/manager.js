(() => {
    const SCRIPT_FLAG = '__managerCallToInitialized__';
    const CONTAINER_SELECTOR = '[class*="ListAdvanced_listItemsContainer"]';
    const BLOCK_CLASS = 'call-to-manager';
    const TEXT_CLASS = 'call-to-manager__content';
    const ACTION_CLASS = 'call-to-manager__action';
    const TARGET_BUTTON_SELECTOR = 'jdiv[class*="jivoDesktopButton"] jdiv[class*="button"]';
    const STYLE_ID = 'call-to-manager-styles';
    const OBSERVER_OPTIONS = {childList: true, subtree: true};

    if (window[SCRIPT_FLAG]) return;
    window[SCRIPT_FLAG] = true;

    const ensureStyles = () => {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const styles = document.createElement('style');
        styles.id = STYLE_ID;
        styles.textContent = `
            .${BLOCK_CLASS} {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px;
                border-radius: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background: #fff;
                box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.10);
            }

            .${TEXT_CLASS} {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .${TEXT_CLASS} p {
                margin: 0;
            }

            .${ACTION_CLASS} {
                display: flex;
                align-items: center;
                gap: 6px;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.20);
                padding: 11px;
                cursor: pointer;
            }
        `;

        document.head.appendChild(styles);
    };

    const ensureBlockAtEnd = (container) => {
        if (!(container instanceof HTMLElement)) {
            return false;
        }

        let block = container.querySelector(`:scope > .${BLOCK_CLASS}`);

        if (!block) {
            container.insertAdjacentHTML('beforeend', `
            <div class="${BLOCK_CLASS}">
                <div class="${TEXT_CLASS}">
                    <p style="font-size: 16px;"><strong>Помощь с выбором</strong></p>
                    <p style="font-size: 14px;">Если трудно определиться</p>
                </div>
                <div class="${ACTION_CLASS}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4315 2.15844C14.6207 2.31905 14.705 2.57145 14.6503 2.81352L12.317 13.1469C12.2661 13.3722 12.1021 13.5552 11.8837 13.6304C11.6652 13.7056 11.4234 13.6623 11.2445 13.516L8.19534 11.0212L6.91612 13.3238C6.78517 13.5595 6.52513 13.6931 6.25725 13.6623C5.98937 13.6315 5.76641 13.4424 5.69234 13.1832L4.47067 8.90734L1.53594 8.3204C1.24721 8.26265 1.03056 8.02233 1.00295 7.72917C0.975352 7.43602 1.14334 7.15948 1.41622 7.04885L13.7495 2.04885C13.9795 1.95561 14.2423 1.99784 14.4315 2.15844ZM3.97793 7.44906L5.13076 7.67962C5.37554 7.72858 5.57246 7.91018 5.64103 8.1502L6.53221 11.2693L7.41725 9.67625C7.51318 9.50357 7.68076 9.38232 7.87478 9.34521C8.0688 9.3081 8.26929 9.35895 8.42218 9.48404L11.254 11.801L13.0689 3.76353L3.97793 7.44906Z" fill="#535353"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3552 3.23082C14.6475 3.04679 14.7508 2.67002 14.5933 2.36264C14.4358 2.05526 14.0696 1.91908 13.7495 2.04884L1.41622 7.04884C1.14334 7.15946 0.975352 7.43601 1.00295 7.72916C1.03056 8.02231 1.24721 8.26264 1.53594 8.32038L4.86927 8.98705C5.03675 9.02055 5.2107 8.98849 5.35523 8.89749L14.3552 3.23082Z" fill="#535353"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.651 2.81355C14.7191 2.51196 14.5709 2.20312 14.293 2.06755C14.0151 1.93197 13.6805 2.00525 13.4847 2.24455L7.4847 9.57788C7.25155 9.86284 7.29355 10.2829 7.57851 10.516L11.2452 13.516C11.424 13.6623 11.6658 13.7056 11.8843 13.6304C12.1028 13.5552 12.2667 13.3723 12.3176 13.1469L14.651 2.81355Z" fill="#535353"/>
                    </svg>
                    <span style="font-size: 14px;">Связаться с менеджером</span>
                </div>
            </div>`);
            block = container.querySelector(`:scope > .${BLOCK_CLASS}`);
        }

        if (!(block instanceof HTMLElement)) {
            return false;
        }

        if (container.lastElementChild !== block) {
            container.appendChild(block);
        }

        const action = block.querySelector(`:scope > .${ACTION_CLASS}`);
        if (action instanceof HTMLElement && action.dataset.bound !== 'true') {
            action.dataset.bound = 'true';
            action.addEventListener('click', () => {
                if (window.jivo_api && typeof window.jivo_api.open === 'function') {
                    const result = window.jivo_api.open({start: 'chat'});
                    if (!result || result.result !== 'fail') {
                        return;
                    }
                }

                const targetButton = document.querySelector(TARGET_BUTTON_SELECTOR);
                if (targetButton instanceof HTMLElement) {
                    ['pointerdown', 'mousedown', 'mouseup', 'click'].forEach((eventName) => {
                        targetButton.dispatchEvent(new MouseEvent(eventName, {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                        }));
                    });

                    targetButton.click();
                }
            });
        }

        return true;
    };

    const init = () => {
        ensureStyles();
        ensureBlockAtEnd(document.querySelector(CONTAINER_SELECTOR));

        const observer = new MutationObserver(() => {
            ensureBlockAtEnd(document.querySelector(CONTAINER_SELECTOR));
        });

        observer.observe(document.documentElement, OBSERVER_OPTIONS);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {once: true});
        return;
    }

    init();
})();
