
var loadingDiv = (function () {
    "use strict";

    var that = {};

    that.show = function () {
        $('#proceso_en_ejecucion').show();
    };

    that.hide = function () {
        $('#proceso_en_ejecucion').hide();
    }

    return that;
}());