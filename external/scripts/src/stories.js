(() => {
    const STORIES_ROOT_SELECTOR = '#stories';
    const STORIES_WIDGET_ATTRIBUTE = 'data-stories-widget';
    const STORIES_WIDGET_TITLE = 'Выгодные путешествия в июне!';
    const STORIES_PALM_IMAGE_URL =
        'https://b2ccdn.coral.ru/content/landing-pages/june-company/2026/bg.webp';
    const STORIES_PHONE_IMAGE_URL =
        'https://b2ccdn.coral.ru/content/landing-pages/june-company/2026/phone.webp';
    const METRIKA_COUNTER_ID = 96674199;
    const STORIES_ITEMS = [
        {
            image: 'https://b2ccdn.coral.ru/content/circle-1.webp',
            label: 'Семьей',
            segment: 'family',
            storyIds: ['family'],
        },
        {
            image: 'https://b2ccdn.coral.ru/content/circle-2.webp',
            label: 'Парой',
            segment: 'couple',
            storyIds: ['couple'],
        },
        {
            image: 'https://b2ccdn.coral.ru/content/circle-3.webp',
            label: 'Соло',
            segment: 'solo',
            storyIds: ['solo'],
        },
    ];

    function ensureStyles() {
        if (document.getElementById('stories-widget-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'stories-widget-styles';
        style.textContent = `
          ${STORIES_ROOT_SELECTOR} {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            margin: -1px !important;
            padding: 0 !important;
            overflow: hidden !important;
            clip: rect(0 0 0 0) !important;
            clip-path: inset(100%) !important;
            border: 0 !important;
            white-space: nowrap !important;
          }

          .stories-widget {
            position: fixed;
            left: 50%;
            bottom: -101px;
            z-index: 40;
            width: 348px;
            height: 200px;
            transform: translateX(-50%);
            pointer-events: auto;
          }

          .stories-widget:hover .stories-widget__inner,
          .stories-widget:focus-within .stories-widget__inner {
            transform: translateY(-115px);
          }

          .stories-widget__inner {
            position: absolute;
            
            width: 100%;
            height: 100%;
            transition: transform 0.34s ease;
            
            background-image: url('${STORIES_PALM_IMAGE_URL}');
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 348px 197px;
            z-index: 1;
            display: flex;
            justify-content: center;
          }

          .stories-widget__title {
            position: absolute;
            bottom: 110px;
            color: #141414;
            font-family: inherit;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.1;
            text-align: center;
            white-space: nowrap;
          }

          .stories-widget__phone {
            position: absolute;
            bottom: -16px;
            width: 265px;
            height: 120px;
            opacity: 0;
            transition: opacity 0.22s ease;
            pointer-events: none;
            z-index: 2;
            display: flex;
            justify-content: center;
          }

          .stories-widget:hover .stories-widget__phone,
          .stories-widget:focus-within .stories-widget__phone {
            opacity: 1;
            pointer-events: auto;
          }

          .stories-widget__phone-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            user-select: none;
            pointer-events: none;
          }

          .stories-widget__stories {
            position: absolute;
            
            bottom: 6px;
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 8px;
            width: 210px;
            
          }

          .stories-widget__story {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            color: #141414;
            border: 0;
            padding: 0;
            background: transparent;
            cursor: pointer;
            font: inherit;
          }

          .stories-widget__story-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
          }

          .stories-widget__story-label {
            font-size: 12px;
            font-weight: 400;
            line-height: 1.1;
            text-align: center;
            white-space: nowrap;
          }

          .stories-widget__story:focus-visible {
            outline: 2px solid #141414;
            outline-offset: 6px;
            border-radius: 16px;
          }
          
          .stories-widget__ads {
            z-index: 2;
            font-size: 6px;
            line-height: 1;
            position: absolute;
            bottom: 97px;
            color: white;
          }

          @media screen and (max-width: 991px) {
            .stories-widget {
              display: none;
            }
          }
        `;

        document.head.appendChild(style);
    }

    function renderStoriesButtons() {
        return STORIES_ITEMS.map(
            (item, index) => `
              <button
                type="button"
                class="stories-widget__story"
                data-story-index="${index}"
              >
                <img
                  src="${item.image}"
                  alt="${item.label}"
                  class="stories-widget__story-image"
                />
                <span class="stories-widget__story-label">${item.label}</span>
              </button>
            `
        ).join('');
    }

    function reachGoal(goalName, params) {
        if (typeof window.ym !== 'function') {
            return;
        }

        if (params) {
            window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName, params);
            return;
        }

        window.ym(METRIKA_COUNTER_ID, 'reachGoal', goalName);
    }

    function insertStoriesWidget() {
        if (!document.body) {
            return false;
        }

        if (document.querySelector(`[${STORIES_WIDGET_ATTRIBUTE}]`)) {
            return true;
        }

        document.body.insertAdjacentHTML(
            'beforeend',
            `<div ${STORIES_WIDGET_ATTRIBUTE} class="stories-widget">
              <div class="stories-widget__inner">
                <div class="stories-widget__phone">
                  <img
                    src="${STORIES_PHONE_IMAGE_URL}"
                    alt=""
                    class="stories-widget__phone-image"
                  />
                  <div class="stories-widget__stories">
                    ${renderStoriesButtons()}
                  </div>
                </div>
                <span class="stories-widget__title">${STORIES_WIDGET_TITLE}</span>
                <span class="stories-widget__ads">Реклама. ООО «Центрбронь» erid: 2W5zFJmhQEu</span>
              </div>
            </div>`
        );

        reachGoal('june_26_group_B');

        return true;
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

    function bindStoriesWidget() {
        const widget = document.querySelector(`[${STORIES_WIDGET_ATTRIBUTE}]`);
        if (!widget || widget.dataset.bound === 'true') {
            return;
        }

        widget.dataset.bound = 'true';
        widget.dataset.showGoalSent = 'false';

        const sendShowGoal = () => {
            if (widget.dataset.showGoalSent === 'true') {
                return;
            }

            widget.dataset.showGoalSent = 'true';
            reachGoal('june_26_sticky_bar_show');
        };

        widget.addEventListener('mouseenter', sendShowGoal);
        widget.addEventListener('focusin', sendShowGoal);
        widget.addEventListener('click', (event) => {
            const button = event.target instanceof Element
                ? event.target.closest('.stories-widget__story')
                : null;

            if (!(button instanceof HTMLElement)) {
                return;
            }

            const storyIndex = Number(button.dataset.storyIndex || '-1');
            const storyItem = STORIES_ITEMS[storyIndex];
            if (!storyItem) {
                return;
            }

            reachGoal('june_26_stories_click_sticky_bar', {
                segment: storyItem.segment,
            });
            openStoryById(storyItem.storyIds);
        });
    }

    function initStoriesWidget() {
        ensureStyles();

        if (!insertStoriesWidget()) {
            return false;
        }

        bindStoriesWidget();
        return true;
    }

    function bootstrap() {
        if (document.body) {
            initStoriesWidget();
            return;
        }

        document.addEventListener(
            'DOMContentLoaded',
            () => {
                initStoriesWidget();
            },
            { once: true }
        );
    }

    bootstrap();
})();
