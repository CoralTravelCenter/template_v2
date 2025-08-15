const searchTabsNav = document.querySelector('.ant-tabs-nav');

const searchTabs = searchTabsNav.querySelectorAll('.ant-tabs-tab');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.dataset.nodeKey === '1') {
            ym(96674199,'reachGoal', 'search_type', {'type_click':'tour'});
        } else if (tab.dataset.nodeKey === '2') {
            ym(96674199,'reachGoal', 'search_type', {'type_click':'oh'});
        } else if (tab.dataset.nodeKey === '3') {
            ym(96674199,'reachGoal', 'search_type', {'type_click':'avia'});
        }
    });
});

