window.dataLayer = window.dataLayer || [];

var originalPush = window.dataLayer.push;

window.dataLayer.push = function () {
    var lastSelectPromotion = null;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg && arg.event === 'select_promotion' && arg.ecommerce) {
            lastSelectPromotion = arg;
        }
    }

    if (lastSelectPromotion) {
        var ecommerce = lastSelectPromotion.ecommerce;

        var yaParams = {
            'select_promotion': {
                component: ecommerce.component,
                index: ecommerce.index,
                page_template: ecommerce.page_template,
                promotion_name: ecommerce.promotion_name,
                tracking_id: ecommerce.tracking_id
            }
        };

        setTimeout(function () {
            if (typeof ym === 'function') {
                ym(96674199, 'reachGoal', 'select_promotion', yaParams);
            }
        }, 500);
    }

    return originalPush.apply(this, arguments);
};
