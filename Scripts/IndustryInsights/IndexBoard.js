$(document).ready(function () {
    $(".opacidad").hide();
    $(".modal").hide();
    

});

/*---modales---*/
/*--=======Funciones para quitar y poner el scroll en el body cuando se abren/cierran los modales===========-->*/
function quita_scroll_del_body() {
    $('body').addClass('sin_scroll');
}
function pone_scroll_del_body() {
    $('body').removeClass('sin_scroll');
}

$("ul.assesments li .industry_insights").click(function () {
    if (IdIndustry != '') {
        //Redirigir a pantalla de industry
        window.location.href = gGetUrlAction.IndustryInsightsIndex.replace("1", IdIndustry);

    } else {

        //Obtener industrias y cargar info de vista parcial
        $('#proceso_en_ejecucion').show();

        $.ajax({
            url: gGetUrlAction.ListIndustries,
            type: 'GET',
            dataType: 'html', // added data type
            success: function (data) {

                $("#listIndustries").html(data);


                $('#proceso_en_ejecucion').hide();
                $("#listIndustries").show();
                $(".opacidad").show();
            },
            error: function (error) {
                console.log(error);
            }
        });



    }

});

/*<!--==========Botones para cerrar modales=========-->	*/
$('body').on("click", ".modal .cerrar, .modal .button", function () {

    pone_scroll_del_body();
    $(".opacidad").hide();
    $(".contenedor_modal").hide();
    $(".modal").hide();
    return false;
});
$(".modal #close_modal").click(function () {
    pone_scroll_del_body();
    $(this).parent().prev(".opacidad").hide();
    $(".contenedor_modal").hide();
    $(this).parent(".modal").hide();
    return false;
});

$('body').on("change", "input[name='Industry']", function () {

    $('#SelectIndustry').removeClass('disabled');
});

$('body').on("click", "#SelectIndustry", function () {

    var industry = $("input[name='Industry']:checked").val();
    window.location.href = gGetUrlAction.IndustryInsightsIndex.replace("1",industry);
    
});



