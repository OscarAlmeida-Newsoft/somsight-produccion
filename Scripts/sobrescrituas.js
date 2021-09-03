$(document).ready(function () {
    loadingDiv.hide()
    /*--------Subir--------*/
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 150) {
            $('#subir').fadeIn();
        } else {
            $('#subir').fadeOut();
        }
    });
    $('#subir').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        return false;
    });

    /*-------------- RSPNSV*/
    var width = $(window).width(), height = $(window).height();
    if (width < 980) {
        $(function () {
            $('#header .logo').prependTo('#header');
            $('.inicio_idiomas').prependTo('#header .superior .content');
        });
    }

    /**Boton Enviar en Formulario**/
	$(".formulario #privacidad_check").click(function(){
	    if($(this).is(':checked')){
	        $('.formulario .boton').removeAttr("disabled");
	    } else {
	        $('.formulario .boton').attr("disabled", "true");  
	    }
	});

    /*--------------Altura banner home*/
    var wHeight = $(window).height();
    $('.foto_home').css('height', wHeight - 100 + 'px');
    $('.foto_home .content').css('height', wHeight - 100 + 'px');
    $('.foto_home .tabla').css('height', wHeight - 100 + 'px');


    /*--------------Icono Responsive*/
    $("#icono_menu_rspnsv").on('click', function () {
        $("#menu").toggle("fast");
        $(".landing #header .inferior").toggle("fast");
        $("#header .pestanas").toggle("fast");
        $(this).toggleClass("activo");
        $('#menu_superior').prependTo('#header');
        $('#header .logo').prependTo('#header');
    });

    /*---Cebra en tablas---*/
    $("table tr:even").addClass("gris_claro");
    /*---Tabs pasos formulario---*/
    $(".pagina_sencilla").hide();
    $(".pagina_sencilla:first").show();
    $("#tabs li:first").addClass("activo");
    $("#tabs li").bind('click', function () {
        var linkIndex = $("#tabs li").index(this);
        $("#tabs li").removeClass("activo");
        $(".pagina_sencilla:visible").hide();
        $(".pagina_sencilla:eq(" + linkIndex + ")").show();
        $(this).addClass("activo");
        return false;
    });
    /*---Tabs productos MS---*/
    $(".pagina_derecha_sencilla").hide();
    $(".pagina_derecha_sencilla:first").show();
    $("#tabs_vertical li:first").addClass("activo");
    $("#tabs_vertical li").bind('click', function () {
        var linkIndex = $("#tabs_vertical li").index(this);
        $("#tabs_vertical li").removeClass("activo");
        $(".pagina_derecha_sencilla:visible").hide();
        $(".pagina_derecha_sencilla:eq(" + linkIndex + ")").show();
        $(this).addClass("activo");
        return false;
    });
    /*---Botones Previo y Siguiente Formulario---*/
    function reset_tab() {
        $(".pagina_sencilla").hide();
        $("#tabs li").removeClass("activo");
    };
    $(".next_paso_1").click(function () {
        reset_tab();
        $(".pagina_sencilla:nth-child(2)").show();
        $("#tabs li:nth-child(2)").addClass("activo");
    });
    $(".next_paso_2").click(function () {
        reset_tab();
        $(".pagina_sencilla:nth-child(3)").show();
        $("#tabs li:nth-child(3)").addClass("activo");
    });
    $(".prev_paso_2").click(function () {
        reset_tab();
        $(".pagina_sencilla:nth-child(1)").show();
        $("#tabs li:nth-child(1)").addClass("activo");
    });
    $(".prev_paso_3").click(function () {
        reset_tab();
        $(".pagina_sencilla:nth-child(2)").show();
        $("#tabs li:nth-child(2)").addClass("activo");
    });
    /*---Acordeones versiones de productos---*/
    $(".acordeon .contenido").hide();
    $(".acordeon .titulo").click(function () {
        $(this).next(".contenido").slideToggle("slow")
		.siblings(".contenido:visible").slideUp("slow");
        $(this).toggleClass("active");
        $(this).siblings(".titulo").removeClass("active");
    });


    //<!--===============================-->		
    /*---NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO NUEVO ---*/
    //<!--===============================-->	
    $(".especial_03 td .specify").click(function () {
        $(this).toggleClass("activo");
        $(this).parent().parent().find("td:nth-child(3) input, td:nth-child(4) input, td:nth-child(5) input").toggleClass("inadvertido");
        $(this).parent().parent().find("td:nth-child(3), td:nth-child(4), td:nth-child(5)").toggleClass("bordem");
    });

    //<!--===============================-->	
    $(".especial_03 td .files").click(function () {
        $("#opacidad").show();
        $("#modal").show();
    });

    //<!--===============================-->	
    $("#modal .cerrar").click(function () {
        $("#opacidad").hide();
        $("#modal").hide();
    });

    //<!--===============================-->
    $(".modal_files li:even").addClass('alt');

    //<!--=============================== ESTE REMUEVE EL FILE EN EL MODAL -->
    $("#modal .trash").click(function () {
        $(this).parent().remove();
    });

    //<!--===============================-->
    $(document).on('click',".desplegable p", function () {
        if (!$(this).parent().hasClass("activo")) {
            $(".desplegable").removeClass("activo");
            $(".desplegable ul").not(this).hide("fast");
            $(this).parent().find("ul").toggle("fast");
            $(".flecha").removeClass("activo");
            $(this).parent().find(".flecha").addClass("activo");
            $(this).parent().addClass("activo");
        }
        else {
            $(".desplegable").removeClass("activo");
            $(this).parent().find("ul").hide("fast");
            $(".flecha").removeClass("activo");
        };
    });
    //<!--===============================-->
    $("#btn_login p").click(function () {
        $("#login").toggle("fast");
        $(this).toggleClass("activo");
    });
    //<!--===============================-->/
    $('#btn_solutions').on('click', function () {
        $('html, body').animate({ scrollTop: $('#our_solutions').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->/
    $('.circulo a').on('click', function () {
        $('html, body').animate({ scrollTop: $('#our_solutions').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->/
    $('#btn_products').on('click', function () {
        $('html, body').animate({ scrollTop: $('#our_products').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->/
    $('#btn_plans').on('click', function () {
        $('html, body').animate({ scrollTop: $('#plans').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->
    $('#btn_about_us').on('click', function () {
        $('html, body').animate({ scrollTop: $('#about_us').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->
    $('#btn_contact_us').on('click', function () {
        $('html, body').animate({ scrollTop: $('#footer').offset().top - 100 }, 'normal');
        return false;
    });
    //<!--===============================-->
    //<!--===============================-->
	$('#btn_cyber').on('click', function(){
	    $('html, body').animate({scrollTop:$('#cyber').offset().top - 0}, 'normal');
	    return false;
	});
    //<!--===============================-->
        $('#btn_productivi').on('click', function(){
            $('html, body').animate({scrollTop:$('#productivi').offset().top - 0}, 'normal');
            return false;
        });
    //<!--===============================-->
        $('#btn_cloud_ready').on('click', function(){
            $('html, body').animate({scrollTop:$('#cloud_ready').offset().top - 0}, 'normal');
            return false;
        });
    //<!--===============================-->
        $('#btn_industry_insi').on('click', function(){
            $('html, body').animate({scrollTop:$('#industry_insi').offset().top - 0}, 'normal');
            return false;
        });
    //<!--===============================-->
        $('#btn_softwar').on('click', function(){
            $('html, body').animate({scrollTop:$('#softwar').offset().top - 0}, 'normal');
            return false;
        });
    //<!--===============================-->
        $('#btn_measure').on('click', function(){
            $('html, body').animate({ scrollTop: $('#measure').offset().top - 0 }, 'normal');
            return false;
        });


    /*---modal---*/
    $("#header .question").click(function () {
        $(".opacidad.infografia").toggle();
        $(".modal.infografia").toggle();
    });
    $(".modal .cerrar").click(function () {
        $(".opacidad.alerta").hide();
        $(".modal.alerta").hide();
    });
    $(".modal #close_modal").click(function () {
        $(".opacidad.infografia").hide();
        $(".modal.infografia").hide();
    });

    $(".modal_files li:even").addClass('alt');

    $(".modal .trash").click(function () {
        $(this).parent().remove();
    });




    $(".desplegable p").click(function () {
        if (!$(this).parent().hasClass("activo")) {
            $(".desplegable").removeClass("activo");
            $(".desplegable ul").not(this).hide("fast");
            $(this).parent().find("ul").toggle("fast");
            $(".flecha").removeClass("activo");
            $(this).parent().find(".flecha").addClass("activo");
            $(this).parent().addClass("activo");
        }
        else {
            $(".desplegable").removeClass("activo");
            $(this).parent().find("ul").hide("fast");
            $(".flecha").removeClass("activo");
        };
    });

    //<!-- for logged-in user -->

    $(".barra").click(function () {
        $(this).next("ul").toggle("fast");
        $(this).find("span.flecha").toggleClass("activo");
    });


});


$(document).on('click', "#touch", function () {
    $("#login").toggle("fast");
    $("#touch span").toggleClass("activo");
    $(this).toggleClass("activo");
});


//
$(document).ready(function () {
    $(document).on('blur', '#Email', function () {
        var EmailVal = $('#Email').val().trim();

        $('#Email').val(EmailVal);
        console.log(EmailVal);
    })
})

function changeLanguage(lang) {
    $("#langForm > #culture").val(lang);
    $("#langForm > #leadIDCulture").val($('#leadID').val());
    $("#langForm > #languageID").val($('#languageID').text());
    $("#langForm").submit();
}