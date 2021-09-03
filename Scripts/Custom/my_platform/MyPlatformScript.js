var iframeLoaded = false;
$(document).ready(function () {
    debugger;
    if (IsSAM360On == "True" || IsSAM360On == true) {
        $(".embed_iframe iframe").on('load',
        function () {
            if (!iframeLoaded) {
                $(".embed_iframe iframe").attr("src", SAM360Url)
                iframeLoaded = true;
            }

        });
    }

});
