(() => {
    const DESKTOP_CONTAINER_SELECTOR =
        '[class*="HeaderMenuNonProductSearch_nonProductSearchContainer"]';
    const DESKTOP_SEARCH_PANEL_SELECTOR =
        '[class*="HeaderMenuNonProductSearchContent_nonProductSearchContainer"]';
    const DESKTOP_TEXT_HIDE_BREAKPOINT = 1280;
    const STORIES_ROOT_SELECTOR = '#stories';
    const DESKTOP_BLOCK_ATTRIBUTE = 'data-flamingo-desktop-block';
    const DESKTOP_ROTATION_INTERVAL = 3 * 1000;
    const DESKTOP_TEXT_REVEAL_DELAY = 180;
    const DESKTOP_LINKS = [
        {
            image: 'https://b2ccdn.coral.ru/content/circle-1.webp',
            label: 'Семьей',
            storyIds: ['family'],
        },
        {
            image: 'https://b2ccdn.coral.ru/content/circle-2.webp',
            label: 'Парой',
            storyIds: ['couple'],
        },
        {
            image: 'https://b2ccdn.coral.ru/content/circle-3.webp',
            label: 'Соло',
            storyIds: ['solo'],
        },
    ];
    let resizeObserver = null;
    let desktopRotationIntervalId = null;
    let desktopTextRevealTimeoutId = null;

    function ensureStyles() {
        if (document.getElementById('flamingo-block-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'flamingo-block-styles';
        style.textContent = `
      .flamingo-block {
        margin-left: auto;
        margin-right: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        box-sizing: border-box;
        flex-shrink: 0;
        transition: margin-right 0.2s ease;
      }

      .flamingo-block.flamingo-block--compact .flamingo-block__text {
        max-width: 0;
        opacity: 0;
        margin-right: -8px;
      }

      .flamingo-block__text {
        color: #242424;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        white-space: nowrap;
        max-width: 240px;
        opacity: 1;
        overflow: hidden;
        transition:
          max-width 0.22s ease,
          opacity 0.16s ease,
          margin-right 0.22s ease;
      }

      .flamingo-block:not(.flamingo-block--text-visible) .flamingo-block__text {
        transition:
          max-width 0.16s ease,
          opacity 0.12s ease,
          margin-right 0.16s ease;
      }

      @media screen and (max-width: 991px) {
        .flamingo-block {
          display: none;
        }
      }

      .flamingo-block__link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-width: 102px;
        color: #242424;
        border: 0;
        padding: 0;
        background: transparent;
        cursor: pointer;
        font: inherit;
      }

      .flamingo-block__image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }

      .flamingo-block__label {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        white-space: nowrap;
      }
    `;

        document.head.appendChild(style);
    }

    function insertDesktopBlock(target) {
        if (!target) {
            return false;
        }

        if (
            target.previousElementSibling?.hasAttribute(DESKTOP_BLOCK_ATTRIBUTE) ||
            document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`)
        ) {
            return true;
        }

        target.insertAdjacentHTML(
            'beforebegin',
            `<div ${DESKTOP_BLOCK_ATTRIBUTE} class="flamingo-block" data-link-index="0">
        <span class="flamingo-block__text">Отправиться в путешествие:</span>
        <button
          type="button"
          class="flamingo-block__link"
        >
          <img
            src="${DESKTOP_LINKS[0].image}"
            alt="${DESKTOP_LINKS[0].label}"
            class="flamingo-block__image"
          />
          <span class="flamingo-block__label">${DESKTOP_LINKS[0].label}</span>
        </button>
      </div>`
        );

        return true;
    }

    function rotateDesktopLink() {
        const desktopBlock = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);
        const desktopLink = desktopBlock?.querySelector('.flamingo-block__link');
        const desktopImage = desktopBlock?.querySelector('.flamingo-block__image');
        const desktopLabel = desktopBlock?.querySelector('.flamingo-block__label');

        if (!desktopLink || !desktopImage || !desktopLabel) {
            return;
        }

        const currentIndex = Number(desktopBlock.dataset.linkIndex || '0');
        const nextIndex = (currentIndex + 1) % DESKTOP_LINKS.length;
        const nextLink = DESKTOP_LINKS[nextIndex];

        desktopImage.src = nextLink.image;
        desktopImage.alt = nextLink.label;
        desktopLabel.textContent = nextLink.label;
        desktopBlock.dataset.linkIndex = String(nextIndex);
    }

    function startDesktopLinkRotation() {
        const desktopBlock = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);
        if (!desktopBlock) {
            return;
        }

        if (desktopRotationIntervalId) {
            return;
        }

        desktopRotationIntervalId = window.setInterval(() => {
            rotateDesktopLink();
        }, DESKTOP_ROTATION_INTERVAL);
    }

    function clearDesktopTextRevealTimeout() {
        if (!desktopTextRevealTimeoutId) {
            return;
        }

        window.clearTimeout(desktopTextRevealTimeoutId);
        desktopTextRevealTimeoutId = null;
    }

    function setDesktopCompactState(desktopBlock, shouldHideText) {
        const hasCompactClass = desktopBlock.classList.contains('flamingo-block--compact');

        if (shouldHideText) {
            clearDesktopTextRevealTimeout();

            if (desktopBlock.classList.contains('flamingo-block--text-visible')) {
                desktopBlock.classList.remove('flamingo-block--text-visible');
            }

            if (!hasCompactClass) {
                desktopBlock.classList.add('flamingo-block--compact');
            }

            return;
        }

        if (!hasCompactClass) {
            return;
        }

        clearDesktopTextRevealTimeout();
        desktopTextRevealTimeoutId = window.setTimeout(() => {
            desktopBlock.classList.add('flamingo-block--text-visible');
            desktopBlock.classList.remove('flamingo-block--compact');
            desktopTextRevealTimeoutId = null;
        }, DESKTOP_TEXT_REVEAL_DELAY);
    }

    function updateDesktopBlockOffset() {
        const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
        const desktopBlock = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);

        if (!desktopContainer || !desktopBlock) {
            return;
        }

        const searchPanel = desktopContainer.querySelector(DESKTOP_SEARCH_PANEL_SELECTOR);
        if (!searchPanel) {
            if (desktopBlock.style.marginRight) {
                desktopBlock.style.marginRight = '';
            }

            setDesktopCompactState(desktopBlock, false);

            return;
        }

        const searchPanelWidth = searchPanel.getBoundingClientRect().width;
        const offset = Math.max(searchPanelWidth - 40, 0);
        const nextMarginRight = `${offset + 8}px`;
        if (desktopBlock.style.marginRight !== nextMarginRight) {
            desktopBlock.style.marginRight = nextMarginRight;
        }

        const shouldHideText =
            window.innerWidth < DESKTOP_TEXT_HIDE_BREAKPOINT && searchPanelWidth > 40;
        setDesktopCompactState(desktopBlock, shouldHideText);
    }

    function observeDesktopSearchPanelSize() {
        const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
        const searchPanel = desktopContainer?.querySelector(DESKTOP_SEARCH_PANEL_SELECTOR);

        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }

        if (!searchPanel || typeof ResizeObserver === 'undefined') {
            return;
        }

        resizeObserver = new ResizeObserver(() => {
            updateDesktopBlockOffset();
        });

        resizeObserver.observe(searchPanel);
    }

    function openStoryById(storyIds) {
        if (!storyIds) {
            return;
        }

        const ids = Array.isArray(storyIds) ? storyIds : [storyIds];

        for (const storyId of ids) {
            const storyTrigger = document.querySelector(
                `${STORIES_ROOT_SELECTOR} [data-story-id="${storyId}"]`
            );

            if (storyTrigger instanceof HTMLElement) {
                storyTrigger.click();
                return;
            }
        }
    }

    function bindDesktopClickHandler() {
        const desktopBlock = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}]`);
        const desktopLink = document.querySelector(`[${DESKTOP_BLOCK_ATTRIBUTE}] .flamingo-block__link`);

        if (!desktopBlock || !desktopLink || desktopLink.dataset.goalBound === 'true') {
            return;
        }

        desktopLink.dataset.goalBound = 'true';
        desktopLink.addEventListener('click', () => {
            const currentIndex = Number(desktopBlock.dataset.linkIndex || '0');
            const currentLink = DESKTOP_LINKS[currentIndex] || DESKTOP_LINKS[0];
            openStoryById(currentLink.storyIds);
        });
    }

    function syncDesktopUi() {
        ensureStyles();

        const desktopContainer = document.querySelector(DESKTOP_CONTAINER_SELECTOR);
        if (!insertDesktopBlock(desktopContainer)) {
            return false;
        }

        updateDesktopBlockOffset();
        observeDesktopSearchPanelSize();
        startDesktopLinkRotation();
        bindDesktopClickHandler();
        return true;
    }

    function initDesktop() {
        if (syncDesktopUi()) {
            const desktopObserver = new MutationObserver(() => {
                syncDesktopUi();
            });

            desktopObserver.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });

            return;
        }

        const desktopBootstrapObserver = new MutationObserver(() => {
            if (!syncDesktopUi()) {
                return;
            }

            desktopBootstrapObserver.disconnect();

            const desktopObserver = new MutationObserver(() => {
                syncDesktopUi();
            });

            desktopObserver.observe(document.documentElement, {
                childList: true,
                subtree: true,
            });
        });

        desktopBootstrapObserver.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    }
    initDesktop();
})();
