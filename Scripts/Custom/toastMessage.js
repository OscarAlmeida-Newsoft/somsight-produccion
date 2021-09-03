/**
 * This tiny script just helps us demonstrate
 * what the various example callbacks are doing
 */
var toastMessage = (function () {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function (options) {
        elem = $(options.selector);
    };

    that.show = function (text, cssClass) {
        that.init({ selector: ".bb-alert" });
        clearTimeout(hideHandler);

        elem.removeClass('alert-success').removeClass('alert-info').removeClass('alert-warning').removeClass('alert-danger');
        elem.addClass(cssClass);
        elem.find("span").html('<b>' + text + '</b>');
        elem.delay(200).fadeIn().delay(3000).fadeOut();
    };

    return that;
}());