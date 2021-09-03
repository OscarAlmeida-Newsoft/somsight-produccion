//$(document).on('click', '#modalConfirm .cerrar', function () {
//    $("#opacidad").hide();
//    $("#modalConfirm").hide();
//});


////Cancel Modal
//$(document).on('click', '#SendAssessmentFinalOk', function () {
    
//});

//$(document).on('click', '#modalConfirm .cancel-button', function () {
//    $("#opacidad").hide();
//    $("#modalConfirm").hide();
//}); 

//$(document).on('click', '#measureMyPlatformAction', function () {
//    debugger;
//    window.location.href = gGetUrlAction.MeasureMyPlataform;
    
//});

$(document).on('click', '#measureMyPlatformAction', function () {
    var urlIFrame = "";

    loadingDiv.show();
    //$('#myPlatformIframe').attr('src', 'http://192.168.1.118/Revenue/');
    //$('#myPlatformIframe').css('display', 'inline');
    $.ajax({
        url: gGetUrlAction.MeasureMyPlataform,
        type: 'GET',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        console.log(data);
        $('#myPlatformIframe').attr('src', data.redirectUrl);
        $('#myPlatformIframe').css('display', 'inline');
        //newwindow = window.open(data.redirectUrl, '_blank', "toolbar=no,scrollbars=no,resizable=no,top=500,left=500,width=400,height=400")
        //if (window.focus) { newwindow.focus() }
        return false;

    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });

});
