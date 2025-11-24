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
        // localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    const style = document.createElement('style');
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
                    border-color: transparent !important;
                }
                
                .anticon svg path,
                .anticon svg circle,
                .anticon svg ellipse,
                .menu-dropdown-item svg path {
                    stroke: white !important;
                }
            }
            
            #breadcrumb-widget span {
                color: white !important;
            }
            
            .ant-picker-date-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner, .ant-picker-month-panel .ant-picker-content .ant-picker-cell .ant-picker-cell-inner {
                background: var(--elevation-level-3) !important;
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
            
            .durationWrapper span {
                color: var(--ant-color-text-secondary)!important;
            }
            
            .ant-input-outlined:hover,
            .ant-input-outlined:focus-within,
            .ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover .ant-select-selector,
            .ant-select-focused.ant-select-outlined:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector,
            .ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover, 
            .ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
                border-color: var(--ant-control-item-bg-active)!important;
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
                border-color: white!important;
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
            
            .ant-select-selection-item .anticon {
                color: var(--ant-color-text-secondary) !important;
            }
            
            .ant-select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
                background: var(--ant-control-item-bg-active) !important;
            }
            
            .ant-select-selector .ant-select-selection-item {
                color: var(--ant-color-text-secondary) !important;
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
            }
        }
    `;

    document.body.appendChild(style);
});