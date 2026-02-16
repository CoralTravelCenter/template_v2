(() => {
    function shouldEnableDarkTheme() {
        return location.pathname.includes('/preview/db09d473-b49f-4439-be41-e40ffee59351/ru-RU/');
    }

    const STYLE_ID = 'diamond-elite';
    const THEME_ATTR = 'data-theme';

    let logoObserver = null;
    let themeApplied = false;

    async function hostReactAppReady(selector = '#__next > div', timeout = 200) {
        return new Promise(resolve => {
            const waiter = () => {
                const host_el = document.querySelector(selector);
                if (host_el?.getBoundingClientRect().height) resolve();
                else setTimeout(waiter, timeout);
            };
            waiter();
        });
    }

    function applyDarkTheme() {
        if (themeApplied) return;
        themeApplied = true;

        document.documentElement.setAttribute(THEME_ATTR, 'dark');

        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.innerText = `
        html[data-theme="dark"] {
            --ant-color-text-base: #ffffff !important;
            --ant-color-text: #ffffff !important;
            --ant-color-text-secondary: rgba(255, 255, 255, 0.85) !important;
            --ant-color-bg-container: #24242C !important;
            --ant-color-text-heading: rgba(225, 225, 225, 0.85) !important;
            --ant-control-item-bg-active: #1668DC !important;
            --ant-color-primary: rgba(22, 104, 220, 1) !important;
            --ant-color-border: #EFEFEF !important;
            --ant-color-split: rgba(255, 255, 255, 0.85) !important;
            --ant-color-bg-elevated: rgba(54, 54, 66, 1) !important;
            --ant-color-bg-base: #3A3A41 !important;
            // --ant-color-border: transparent !important;
            
            --ant-color-bg-layout: #24242C !important;
            // --ant-color-split: #3A3A41 !important;
            --ant-color-bg-container: rgba(54, 54, 66, 1) !important;
            
            --ant-orange-1: #121212 !important;
            
            --elevation-level-1: #121212 !important;
            --elevation-level-2: #24242C !important;
            --elevation-level-3: rgba(54, 54, 66, 1) !important;
            --base-break: rgba(255, 255, 255, 0.10) !important;
            --item-bg: #3A3A41 !important;
            --text: #B2B2B2 !important;
            --text-disabled: #777 !important;
        }
        
        .not-a-member {
            color: var(--ant-color-text-secondary)!important;
        }
        
        html[data-theme="dark"] {
            #header-row {
                background-color: #24242C !important;
                
                .submenu {
                    background-color: var(--elevation-level-3);
                }

                .btn-child span {
                    color: white !important;
                }
                
                .basic-button-container {
                    color: white !important;
                }
                
                button:has(.ant-avatar) {
                    background: #24242C !important;
                    border-color: white !important;
                }
                
                .anticon svg path,
                .anticon svg circle,
                .anticon svg ellipse,
                .menu-dropdown-item svg path {
                    stroke: white !important;
                }
                
                .prefix-icon-prefix svg path, .prefix-icon-prefix svg circle {
                    stroke: var(--item-bg) !important;
                }
            }
            
            .ant-picker-outlined, 
            .ant-input-outlined {
                border-color: var(--text)!important;
            }
            
            coral-bubble span {
                color: white !important;
            }
            
            coral-bubble {
                border-color: white !important;
            }
            
            .coral-popup-trigger:hover {
                border-color: var(--ant-color-primary) !important;
            }
            
            .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector {
                border-color: var(--text) !important;
            }
            
            #footer-row { 
                .ant-btn-color-link.ant-btn-variant-link {
                    background: transparent !important;
                    border-color: var(--ant-color-primary) !important;
                }
                
                .ant-btn-color-link.ant-btn-variant-link:hover {
                    background: var(--ant-color-primary) !important;
                }
            }
            
            #breadcrumb-widget span {
                color: white !important;
            }
            
            .lazy-flightWidget__QuickSearchFlightFromIcon svg path,
            .lazy-flightWidget__QuickSearchFlightFromIcon svg rect,
            .lazy-flightWidget__QuickSearchFlightToIcon svg path {
                fill: white !important;
            }
           
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-disabled.ant-picker-cell-in-view > div,
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-disabled.ant-picker-cell-in-view > div,
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-disabled.ant-picker-cell-in-view > div.ant-picker-cell-inner.shadowInRange,
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-disabled.ant-picker-cell-in-view > div.ant-picker-cell-inner.shadowInRange {
                background: transparent !important;
                color: var(--text-disabled) !important;
            }
            
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.both-day,
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.both-day {
                background: linear-gradient(135deg, rgb(252, 223, 156) 50%, rgb(217, 247, 190) 50%)!important;
                color: black;
            }
            
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.regular-day,
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.regular-day {
                background: rgb(252, 223, 156)!important;
                color: black;
            }
            
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.charter-day, 
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner.charter-day {
                background: rgb(217, 247, 190)!important;
                color: black;
            }
            
            .ant-tree-select-dropdown .ant-select-tree-checkbox .ant-select-tree-checkbox-inner,
            .ant-checkbox .ant-checkbox-inner {
                background: transparent !important;
                border-color: white !important;
            }
            
            .ant-picker-outlined {
                background: var(--item-bg)!important;
            }
            
            .durationWrapper span {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-input-outlined:hover,
            .ant-input-outlined:focus-within,
            .ant-picker-outlined:hover,
            .ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover .ant-select-selector,
            .ant-select-focused.ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector,
            .ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover, 
            .ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
                border-color: var(--ant-control-item-bg-active)!important;
            }
            
            .ant-picker .ant-picker-suffix svg rect,
            .ant-picker .ant-picker-suffix svg path {
                stroke: white !important;
            }
            
            .ant-picker-outlined::placeholder,
            .ant-picker .ant-picker-input > input::placeholder {
                color: var(--text)!important;
            }
            
            .ant-picker .ant-picker-input > input {
                color: transparent!important;
            }
            
            .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-end,
            .ant-picker-dropdown .ant-picker-cell-in-view.ant-picker-cell-range-start {
                background: var(--ant-color-primary) !important;
            }
            
            .qs-calendar .custom-display-value {
                background: transparent !important;
            }
            
            .ant-tree .ant-tree-treenode:not(.ant-tree-treenode-disabled) .ant-tree-node-content-wrapper:hover,
            .ant-tree-select-dropdown .ant-select-tree .ant-select-tree-treenode:not(.ant-select-tree-treenode-disabled) .ant-select-tree-node-content-wrapper:hover{
                color: var(--ant-color-text-secondary)!important;
                background: var(--elevation-level-2)!important;
            }
            
            .ant-picker-outlined:focus, 
            .ant-picker-outlined:focus-within {
                border-color: var(--ant-color-primary)!important;
            }
            
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-in-view > div.ant-picker-cell-inner.shadowSelection, 
            .ant-picker-month-panel .ant-picker-content .ant-picker-cell.ant-picker-cell-in-view > div.ant-picker-cell-inner.shadowSelection {
                background: var(--ant-control-item-bg-active)!important;
            }
            
            .datepicker-footer .anticon svg path {
                stroke: white !important;
            }
            
            .datepicker-footer .ant-space-item {
                color: white !important;
            }
            
            .ant-btn-variant-outlined {
                background: transparent!important;
            }
            
            [class*='QuickSearchFlightsSelectTravelers_flightFormTravelers'] .ant-btn-variant-outlined {
                background: var(--item-bg)!important;
                border-color: var(--text)!important;
            }
            
            [class*='PassengerSelectFlight_passengerSelectInputContainer'] .adultDecreaseButton,
            [class*='PassengerSelectFlight_passengerSelectInputContainer'] .adultIncreaseButton,
            [class*='PassengerSelectFlight_passengerSelectInputContainer'] [name="adultInput"] {
                border-color: var(--text)!important;
            }
            
            .ant-btn-color-default {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
                color: var(--ant-color-primary) !important;
            }
            
            .ant-tabs .ant-tabs-ink-bar {
                background: var(--ant-color-primary) !important;
            }
            
            .ant-tabs .ant-tabs-tab .ant-tabs-tab-btn .anticon svg path, 
            .ant-tabs .ant-tabs-tab .ant-tabs-tab-btn .anticon svg rect {
                stroke: white !important;
            }
            
            .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .anticon svg path,
            .ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn .anticon svg rect {
                stroke: var(--ant-color-primary) !important;
            }
            
            .ant-picker-dropdown .ant-picker-cell-in-view {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-select-outlined:not(.ant-select-customize-input) .ant-select-selector,
            .ant-input-outlined {
                background: var(--item-bg) !important;
            }
            
            .ant-select-dropdown {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-tree .ant-tree-checkbox .ant-tree-checkbox-inner {
                background: var(--elevation-level-3) !important;
                border-color: white !important;
            }
            
            .ant-select .ant-select-selection-placeholder,
            .ant-input-affix-wrapper {
                color: var(--text) !important;
            }
            
            .ant-tag span {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .content span:hover {
                background: var(--elevation-level-2) !important;
            }
            
            [class*='SingleFromAndToSelectWrapper_exchangeIcon'] {
                background: var(--item-bg) !important;
            }
            
            [class*='SingleFromAndToSelectWrapper_exchangeIcon'] svg path {
                fill: white !important;
            }
            
            [class*='FlyingTo_flyingTo'], 
            [class*='FlyingFrom_flyingFrom'] {
                border-color: var(--text) !important;
            }
            
            [class*='FlyingTo_flyingTo']:hover, 
            [class*='FlyingFrom_flyingFrom']:hover {
                border-color: var(--ant-color-primary) !important;
            }
            
            .ant-select-selection-item .anticon {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
                background: var(--ant-control-item-bg-active) !important;
            }
            
            .ant-select-selector .ant-select-selection-item {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-select {
                color: white!important;
            }
            
            .ant-input-affix-wrapper .anticon.ant-input-password-icon {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-input::placeholder,
            .ant-input {
                color: var(--text) !important;
            }
            
            .ant-dropdown .ant-dropdown-menu-title-content img {
                filter: invert(1)!important;
            }
            
            .ant-form-item .anticon svg path {
                stroke: var(--ant-color-text-secondary) !important;
            }
            
            .ant-select-outlined svg path,
            .ant-select-outlined svg circle,
            .ant-input-outlined svg path,
            .ant-input-outlined svg circle,
            .ant-input-outlined svg rect {
                stroke: white !important;
            }
            
            .ant-divider {
                border-block-start-color: var(--base-break) !important;
            }
            
            .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
                background-color: rgba(22, 104, 220, 1) !important;
            }
            
            .ant-btn-variant-solid {
                background-color: rgba(22, 104, 220, 1) !important;
            }
            
            #section-row-6 {
                background-color: #24242C !important;
            }
            
            .ant-select-dropdown {
                background: var(--elevation-level-3);
            }
                
            .ant-select-dropdown .ant-select-item {
                color: rgba(225, 225, 225, 0.85) !important;
            }
            
            .ant-radio-wrapper,
            .ant-picker-dropdown .ant-picker-header {
                color: rgba(225, 225, 225, 0.85) !important;
            }
            
            .ant-modal {
                color: var(--ant-color-text-secondary)!important;
            }
                
            .ant-modal .ant-modal-header,
            .ant-modal .ant-modal-content,
            .ant-modal-close {
                background: rgba(54, 54, 66, 1) !important;
            }
            
            .ant-modal .ant-modal-close {
                color: #ffffff !important;
                border-color: #ffffff !important;
            }
            
            .ant-modal .ant-modal-close:hover svg path {
                fill: var(--elevation-level-2)!important;
            }
            
            .ant-modal .ant-modal-title {
                color: var(--ant-color-text-secondary);
            }
            
            .ant-popover .ant-popover-inner {
                background: var(--elevation-level-3);
            }
            
            .ant-btn-variant-outlined:disabled {
                background: transparent !important;
                color: var(--text-disabled) !important;
            }
            
            .ant-picker-dropdown .ant-picker-panel-container {
                background: var(--elevation-level-3);
            }
            
            .ant-picker-dropdown .ant-picker-content th {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
                background-color: #24242C !important;
            }
            
            .ant-tree,
            .ant-tree-select-dropdown .ant-select-tree {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-tree-select-dropdown .ant-select-tree {
                background-color: var(--elevation-level-3);
            }
            
            .ant-select-dropdown .ant-select-item {
                color: var(--ant-color-text-secondary)!important;
            }
            
            #section-row-7 {
                background-color: #24242C !important;
            }
            
            .ant-popover .text,
            .ant-popover .title,
            .ant-popover .value,
            .ant-popover .content span,
             .children-container .child-item .label,
             .children-container .child-item .age {
                color: white !important;
            }
            
            .ant-popover .ant-popover-title {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-tabs .ant-tabs-tab {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-dropdown .ant-dropdown-menu {
                background-color: var(--elevation-level-3);
            }
            
            .ant-dropdown .ant-dropdown-menu .departure-city-modal-container  .anticon svg path,
            .ant-modal .departure-city-modal-container .anticon svg path {
                fill: white !important;
            }
            
            .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item:hover {
                background: var(--elevation-level-2) !important;
            }
            
            .ant-tabs,
            .ant-form-item .ant-form-item-label > label {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-title-content > a {
                color: white !important;
            }
            
            .pickertitle {
                color: #33C2FF!important;
            }
            
            #footer-row {
                background-color: #24242C !important;
                
                .column {
                    background-color: #24242C !important;
                }
                
                [class*='FooterWidget_footerWidget'] {
                    background-color: transparent !important;
                }
            }
            
            /*---mobile---*/
            
            @media screen and (max-width: 992px) {
                [class*='HeaderHamburgerMenu_menuContainer'] {
                    background: var(--elevation-level-3);
                }
                
                .select-option-item.selected {
                    background: var(--elevation-level-2) !important;
                }
                
                .visible-on-mobile [class*='DepartureListItem_listItem'] svg path {
                    fill: white !important;
                }
                
                [class*='HeaderHamburgerExtraMenus_headerHamburgerExtraMenus'] {
                    border: 1px solid var(--text)!important;
                    background: transparent !important;
                }
                
                [class*='HeaderHamburgerExtraMenus_headerHamburgerExtraMenus'] a {
                    color: white !important;
                }
                
                [class*='HeaderHamburgerExtraMenus_headerHamburgerExtraMenus'] a:first-child {
                    border-color: var(--text)!important;
                }
                
                [class*='LoginAccountMenu_loginAccountMenuLink'] {
                    color: white !important;
                    border-color: var(--text)!important;
                }
                
                [class*='LoginAccountMenu_loginAccountMenuLink'] img {
                    filter: invert(1)!important;
                }
                
                .ant-btn-variant-outlined {
                    border-color: var(--text)!important;
                }
                
                .ant-checkbox-group .ant-checkbox-wrapper.ant-checkbox-wrapper-checked {
                    background: var(--elevation-level-2);
                }
                
                .ant-checkbox-group .ant-checkbox-wrapper .ant-checkbox-label {
                    color: white !important;
                }
                
                .ant-checkbox-group .ant-checkbox-wrapper {
                    border-color: var(--text)!important;
                }
                
                .ant-modal-close svg path {
                    fill: white !important;
                }
                
                [class*='QSArrivalSelect_qsArrivalSelectDropdownRender'] [class*='QSArrivalSelect_content'] .ant-tree {
                    background: var(--elevation-level-3)!important;
                }
                
                [class*='QSArrivalSelect_qsArrivalSelectDropdownRender'] [class*='QSArrivalSelect_content'] [class*='QSArrivalSelect_title'] {
                    background: var(--elevation-level-3)!important;
                }
                
                .ant-tree .ant-tree-treenode:before {
                    background: var(--elevation-level-3)!important;
                }
                
                // .text,
                // .content span {
                //     color: white !important;
                // }
                
                [data-testid="quickSearchBarBlock"] .ant-tabs {
                    background: var(--elevation-level-3)!important;
                }
                
                .custom-date-picker .datepicker-mobile-header .title {
                    color: white !important;
                }
                
                .ant-picker-date-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner, .ant-picker-month-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner {
                    background: transparent !important;
                }
                
                .ant-input-clear-icon svg path, .ant-icon-close-circle svg path {
                    fill: white !important;
                }
                
                [class*='QSTreeSelect_qsTreeSelectMobileContainer'] .ant-tag {
                    border-color: var(--text)!important;
                }
                
                [class*='FooterWidget_footerWidget'] {
                    background: var(--elevation-level-2)!important;
                }
                
                .lazy-footer__PlusIcon svg path,
                .lazy-footer__MinusIcon svg path {
                    stroke: white !important;
                }
                
                .ant-select-show-search.ant-select:not(.ant-select-customize-input) .ant-select-selector input {
                    color: white !important;
                }
                
                .lazy-CloseOutlinedIcon svg path {
                    stroke: white !important;
                }
            }
        }
    `;
            document.body.appendChild(style);
        }

        logoObserver = new MutationObserver(() => {
            if (!shouldEnableDarkTheme()) return;

            if (window.innerWidth > 992) {
                const topBar = document.querySelector('[class*="LimitedContainer_container"]');
                if (topBar) {
                    const img = topBar.querySelector('img');
                    if (img) {
                        img.src = 'https://b2ccdn.coral.ru/content/dark-theme/logo_coral.webp';
                    }
                    // logoObserver?.disconnect();
                }
            } else {
                const mobileTopBar = document.querySelector('[class*="header-mobile"]');
                if (mobileTopBar) {
                    const img = mobileTopBar.querySelector('img');
                    if (img) {
                        img.src = 'https://b2ccdn.coral.ru/content/dark-theme/logo_coral.webp';
                        img.style.height = '24px';
                    }
                    // logoObserver?.disconnect();
                }
            }
        });

        logoObserver.observe(document.body, { childList: true, subtree: true });
    }

    function cleanupDarkTheme() {
        if (!themeApplied) return;
        themeApplied = false;

        logoObserver?.disconnect();
        logoObserver = null;

        document.getElementById(STYLE_ID)?.remove();

        document.documentElement.removeAttribute(THEME_ATTR);
    }

    async function syncThemeByRoute() {
        await hostReactAppReady();

        if (shouldEnableDarkTheme()) applyDarkTheme();
        else cleanupDarkTheme();
    }

    function hookHistory(fnName) {
        const original = history[fnName];
        history[fnName] = function (...args) {
            const ret = original.apply(this, args);
            window.dispatchEvent(new Event('app:navigation'));
            return ret;
        };
    }
    hookHistory('pushState');
    hookHistory('replaceState');
    window.addEventListener('popstate', () => window.dispatchEvent(new Event('app:navigation')));
    window.addEventListener('app:navigation', syncThemeByRoute);

    window.addEventListener('hashchange', syncThemeByRoute);

    syncThemeByRoute();
})();