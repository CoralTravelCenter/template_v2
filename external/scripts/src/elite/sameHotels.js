(() => {
    const SCRIPT_FLAG = '__sameHotelsAnchorInitialized__';
    const TOP_BAR_SELECTOR = '[class*="HotelDetailAnchorBar_layoutContainerLimit"]';
    const TARGET_SELECTOR = '.similar-hotels-block';
    const BUTTON_CLASS = 'same-hotels-anchor-item';
    const STYLE_ID = 'same-hotels-anchor-styles';
    const MAX_WAIT_MS = 30000;

    if (window[SCRIPT_FLAG]) {
        return;
    }

    window[SCRIPT_FLAG] = true;

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .${BUTTON_CLASS} {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                border-radius: var(--ant-border-radius-lg);
                padding: var(--ant-padding-xs);
            }
            
            .${BUTTON_CLASS}:hover {
                background: var(--ant-color-primary);
            }
            
            .${BUTTON_CLASS}:hover span {
                color: white;
            }
            
            .${BUTTON_CLASS}:hover rect,
             .${BUTTON_CLASS}:hover path {
                stroke: white;
            }

            .${BUTTON_CLASS} span {
                line-height: 1;
                color: var(--ant-color-text-secondary);
            }

            .${BUTTON_CLASS} svg {
                flex: 0 0 auto;
            }
        `;

        document.head.appendChild(style);
    }

    function getTopBar() {
        return document.querySelector(TOP_BAR_SELECTOR);
    }

    function getTargetBlock() {
        return document.querySelector(TARGET_SELECTOR);
    }

    function hasTargetBlock() {
        return Boolean(getTargetBlock());
    }

    function scrollToTarget() {
        const target = getTargetBlock();
        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }

    function createButton() {
        const button = document.createElement('div');
        button.className = BUTTON_CLASS;

        const anchorItemClass = Array.from(getTopBar()?.children || []).find((node) => {
            return Array.from(node.classList || []).some((className) => className.includes('AnchorItem_anchorItem'));
        })?.className;

        if (anchorItemClass) {
            button.className = `${anchorItemClass} ${BUTTON_CLASS}`;
        }

        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3.70361" y="5.42017" width="8.06502" height="2.41951" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M6.5293 18.3243H8.9488V21.5503H6.5293V18.3243Z" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M2.89844 10.2593H12.5765V21.5503H2.89844V14.2918V10.2593Z" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M5.31836 10.2591V7.8396" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M10.1582 10.2591V7.8396" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M4.91455 13.0818H6.52755" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M4.91455 15.9047H6.52755" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M8.94727 13.0818H10.5603" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M8.94727 15.9047H10.5603" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M10.5303 3.7626V3.00061H18.5953V5.42012H13.499" stroke="#535353" stroke-width="1.07531" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.4995 7.83948C17.279 7.83948 15.6187 7.83948 19.3982 7.83948V19.1305H14.4995" stroke="#535353" stroke-width="1.07531" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.4995 15.9H15.4194V19.126H14.4995" stroke="#535353" stroke-width="1.07531" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.981 7.83955V5.42004" stroke="#535353" stroke-width="1.07531" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.77 10.6623H17.383" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
                <path d="M15.77 13.4851H17.383" stroke="#535353" stroke-width="1.07531" stroke-linejoin="round"/>
            </svg>
            <span>Похожие отели</span>
        `;

        button.addEventListener('click', () => {
            scrollToTarget();
            ym(96674199, 'reachGoal', 'personalization_elite_similar_hotels');
        });

        return button;
    }

    function ensureAnchorButton() {
        const topBar = getTopBar();

        if (!topBar || !hasTargetBlock()) {
            return;
        }

        if (topBar.querySelector(`.${BUTTON_CLASS}`)) {
            return;
        }

        topBar.appendChild(createButton());
    }

    function startAnchorObserver() {
        injectStyles();
        ensureAnchorButton();

        const observer = new MutationObserver(() => {
            if (!hasTargetBlock()) {
                observer.disconnect();
                return;
            }

            ensureAnchorButton();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    function bootstrap() {
        if (hasTargetBlock()) {
            startAnchorObserver();
            return;
        }

        const startedAt = Date.now();
        const bootstrapObserver = new MutationObserver(() => {
            if (hasTargetBlock()) {
                bootstrapObserver.disconnect();
                startAnchorObserver();
                return;
            }

            if (Date.now() - startedAt > MAX_WAIT_MS) {
                bootstrapObserver.disconnect();
            }
        });

        bootstrapObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        window.setTimeout(() => {
            bootstrapObserver.disconnect();
        }, MAX_WAIT_MS);
    }

    bootstrap();
})();
