var selectedActivity = {
    AssessmentSummaryId: 0,
    ActivityId: 0
}

var selectedProcessIdToDelete = 0;

$(document).ready(function () {

    $(".opacidad").hide();
    $(".modal.alerta").hide();

    $('#SelectIndustry').on('click', function () {

        if ($('#RadioGroup1_1').is(':checked')) {
            window.location.href = 'Index/2';
        } else {
            window.location.href = 'Index/1';
        }
        

    });
	

    //Archivos JS - Diseñador - Emotica
    /*--------Subir / Indice assesment--------*/
    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 150) {
            $('#subir').fadeIn();
		 
        } else {
            $('#subir').fadeOut();
		  
        }
    });

    $('#subir').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'fast');
        return false;
    });
		 
		 
		 
		 
		 
		 
    /*-------------- RSPNSV*/
    var width = $(window).width(), height = $(window).height();
    if (width < 980){
        $(function () {
            $('.pestanas').prependTo('#menu_superior');
        });
    } 
		 
	
	
	
	
	
	
		 
    /*--------------Altura banner home*/
    var wHeight = $(window).height();
    $('#rotator ul').css('height', wHeight-100+'px');
    $('#rotator li').css('height', wHeight-100+'px');
    $('#foto_home').css('height', wHeight-100+'px');
    $('#foto_home .content').css('height', wHeight-100+'px');
    $('#foto_home .tabla').css('height', wHeight-100+'px');
		
		
		
		
		
		
		
		
		
		
		
		
    /*--------------Icono Responsive*/
    $("#icono_menu_rspnsv").on('click',function(){
        $("#menu").toggle("fast");
        $("#header .pestanas").toggle("fast");
        $(this).toggleClass("activo");
    });	
		
		
		
		
		
		
		
		
		
	
    /*---Cebra en tablas---*/
    $("table tr:odd").addClass("gris_claro");
    /*---Tabs pasos formulario---*/
    $(".pagina_sencilla").hide();
    $(".pagina_sencilla:first").show();
    $("#tabs li:first").addClass("activo");
    $("#tabs li").bind('click', function() {
        var linkIndex = $("#tabs li").index(this);
        $("#tabs li").removeClass("activo");
        $(".pagina_sencilla:visible").hide();
        $(".pagina_sencilla:eq("+linkIndex+")").show();
        $(this).addClass("activo");
        return false;
    });
		
		
		
		
		
		
		
		
    /*---Tabs productos MS---*/
    $(".pagina_derecha_sencilla").hide();
    $(".pagina_derecha_sencilla:first").show();
    $("#tabs_vertical li:first").addClass("activo");
    $("#tabs_vertical li").bind('click', function() {
        var linkIndex = $("#tabs_vertical li").index(this);
        $("#tabs_vertical li").removeClass("activo");
        $(".pagina_derecha_sencilla:visible").hide();
        $(".pagina_derecha_sencilla:eq("+linkIndex+")").show();
        $(this).addClass("activo");
        return false;
    });
		
		
		
		
		
		
    /*---Botones Previo y Siguiente Formulario---*/
    function reset_tab(){
        $(".pagina_sencilla").hide();
        $("#tabs li").removeClass("activo");
    };
    $(".next_paso_1").click(function(){
        reset_tab();
        $(".pagina_sencilla:nth-child(2)").show();
        $("#tabs li:nth-child(2)").addClass("activo");
    });
    $(".next_paso_2").click(function(){
        reset_tab();
        $(".pagina_sencilla:nth-child(3)").show();
        $("#tabs li:nth-child(3)").addClass("activo");
    });
    $(".prev_paso_2").click(function(){
        reset_tab();
        $(".pagina_sencilla:nth-child(1)").show();
        $("#tabs li:nth-child(1)").addClass("activo");
    });
    $(".prev_paso_3").click(function(){
        reset_tab();
        $(".pagina_sencilla:nth-child(2)").show();
        $("#tabs li:nth-child(2)").addClass("activo");
    });
		
		
		
		
		
		
		
		
		
		
		
		
		
    /*---Acordeones versiones de productos---*/
    /*		$(".acordeon .contenido").hide();
            $(".acordeon .titulo").click(function(){
                $(this).next(".contenido").slideToggle("slow")
                .siblings(".contenido:visible").slideUp("slow");
                $(this).toggleClass("active");
                $(this).siblings(".titulo").removeClass("active");
            });*/
	
	
	
	
	
	
	
	
	
    /*---tabla especial_03 ---*/

	$(".especial_03 td .specify").click(function(){
	    $(this).toggleClass("activo");
	    $(this).parent().parent().find("td:nth-child(3) input, td:nth-child(4) input, td:nth-child(5) input").toggleClass("inadvertido");
	    $(this).parent().parent().find("td:nth-child(3), td:nth-child(4), td:nth-child(5)").toggleClass("bordem");
	});
	

	$(".especial_03 td .files").click(function(){
	    $("#opacidad").show();
	    $("#modal").show();
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
    
	
    /*<!--===============================-->	*/
	$("#header .question").click(function(){
	    $(".opacidad.infografia").toggle();
	    $(".modal.infografia").toggle();
	    return false;
	});
	
    /*<!--==========Botones para cerrar modales=========-->	*/
	//$(".modal .cerrar, .modal .button").click(function(){
	//    pone_scroll_del_body();
	//    $(".opacidad").hide();
	//    $(".contenedor_modal").hide();
	//    $(".modal").hide();
	//    return false;
    //});
	$(document).on('click', ".modal .cerrar, .modal .button .cerrar", function () {
	    pone_scroll_del_body();
	    $(".opacidad").hide();
	    $(".contenedor_modal").hide();
	    $(".modal").hide();
	    return false;
	});
    //$(".modal #close_modal").click(function(){
    //    pone_scroll_del_body();
    //    $(this).parent().prev(".opacidad").hide();
    //    $(".contenedor_modal").hide();
    //    $(this).parent(".modal").hide();
    //    return false;
    //});
	$(document).on('click',".modal #close_modal",function () {
	    CloseCreateProcessModal();
	    return false;
	});
	
    /*<!--=============Abre modal de selección de tipo de Industria=======-->	*/
	$(".industry_insights ul.assesments li .btn_go_for_it").click(function(){
	    $(".opacidad").show();
	    $(".modal").show();
	    return false;
	});
	
    /*<!--============Abre modal de alerta del botón inactivo de descarga de Recommmendationsn=======-->/*/
    $('.industry_insights .btn.download ').on('click', function(){

        if (!$(this).hasClass('active')) {
            $(".opacidad").show();
            $(".modal.alerta").show();
            return false;
        }
        
    });
	
    /*<!--==========Abre modal para Adicionar Proceso=====-->*/	
	//$("#define_value_contents .content .izk .add").click(function(){
	//    //quita_scroll_del_body();
	//    //$(".opacidad").show();
	//    //$(".contenedor_add_process").show();
	//    //$(".modal.add_process").show();
	//    return false;
    //});
    $(document).on('click', '#define_value_contents .content .izk .add', function () {
        OpenCreateProcessModal();
        return false;
    });

	
    /*<!--============Adiciona Problema / Oportunidad a Tabla=======-->	*/
	$(".industry_insights .ii_process .problems a.add, .edit_problem").click(function () {
	    quita_scroll_del_body();
	    $(".opacidad").show();
	    $(".contenedor_add_to_current").show();
	    $(".modal.add_to_current").show();
	    return false;
	});

    //Adiciona en Digital Transformation
    $(".industry_insights .ii_process .digitaltrans a.add, .edit_digitaltrans").click(function () {
	    quita_scroll_del_body();
	    $(".opacidad").show();
	    $(".contenedor_add_to_current_digitaltrans").show();
	    $(".modal.add_to_current_digitaltrans").show();
	    return false;
	});
	
	
    /*<!--===============================-->*/	
	//$(".industry_insights .options a.edit").click(function(){
	//    OpenCreateProcessModal();
	//    return false;
    //});
    $(document).on('click', '.industry_insights .options a.edit', function () {
        var _processId = $(this).data('processid');
        OpenEditProcessModal(_processId);
        return false;
    });

    $(document).on('click', '.industry_insights .options a.delete', function () {
        selectedProcessIdToDelete = $(this).data('processid');
        $('.opacidad').show();
        $('#modalConfirm').css('z-index', 10001);
        $('#modalConfirm').show();
        return false;
    });

    $(document).on('click', '.cancel-button', function () {
        $('.opacidad').hide();
        $('#modalConfirm').hide();
        $("#modalConfirmSubmit").hide();
        pone_scroll_del_body();
    });


    $(document).on('click', '#delete-process-ok', function () {
        $.ajax({
            url: $('#NS_DeleteProcessURLCallback').text() + "?pProcessId=" + selectedProcessIdToDelete,
            //data: JSON.stringify(pFilterModel),
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        })
       .done(function (data) {
           $('.opacidad').hide();
           $('#modalConfirm').hide();
           LoadAboutThisActivities();
       })
       .fail(function (jqXHR, exception) {
           console.log(exception);
       })
       .always(function () {
           loadingDiv.hide();
       });
    });














    /*<!--===============================-->*/
    $(".desplegable p").click(function(){
        if(!$(this).parent().hasClass("activo")){
            $(".desplegable").removeClass("activo");
            $(".desplegable ul").not(this).hide("fast");
            $(this).parent().find("ul").toggle("fast");
            $(".flecha").removeClass("activo");
            $(this).parent().find(".flecha").addClass("activo");
            $(this).parent().addClass("activo");
        }
        else{
            $(".desplegable").removeClass("activo");
            $(this).parent().find("ul").hide("fast");
            $(".flecha").removeClass("activo");
        };
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
    /*<!--===============================-->*/
        //$("#btn_login p").click(function(){
        //    $("#login").toggle("fast");
        //    $(this).toggleClass("activo");
        //});












    /*<!-- for logged-in user -->*/
    //    $("#touch").click(function(){
    //        $("#login").toggle("fast");
    //        $("#touch span").toggleClass("activo");
    //        $(this).toggleClass("activo");
    //    });
    //$(".barra").click(function(){
    //    $(this).next("ul").toggle("fast");
    //    $(this).find("span.flecha").toggleClass("activo");
    //});













    /*<!--===============================-->	*/
        $(".alerta .button").click(function(){
            $(".alerta").hide();
            $(".opacidad").hide();
            return false;
        });	
	







	
   /* <!--===============================-->

        <!--NEW-->
	
    <!--===============================-->
    /*---Tabs industry insights define value---*/
            $("#define_value_contents .content").hide();
    $("#define_value_contents .content:first-child").show();
    $("#define_value li:first a").addClass("activo");


    //*******MODIFICADO X NEWSOFT 06/04/2018 **********************
    //permite la selección de las diferentes actividades de la cadena de valor para mostrar su contenido

    /*
    $("#define_value li a").bind('click', function () {

        $("#define_value_contents .izk .about_this").addClass("activo");
        var linkIndex = $("#define_value li a").index(this);
        
        $("#define_value li a").removeClass("activo");
        $("#define_value_contents .content:visible").hide();
        $("#define_value_contents .content:eq(" + linkIndex + ")").show();

        //debugger;
        //if ($("#define_value_contents .content:eq(" + linkIndex + ") .ii_processes .activo").length == 0) {
        //    $("#define_value_contents .content:eq(" + linkIndex + ") .original").show();
        //    $("#define_value_contents .content:eq(" + linkIndex + ") .ii_process").hide();
        //} else {
        //    $("#define_value_contents .content:eq(" + linkIndex + ") .original").hide();
        //    $("#define_value_contents .content:eq(" + linkIndex + ") .ii_process").show();
        //}
        $("#define_value_contents .content:eq(" + linkIndex + ") .original").show();
        $(".ii_processes li .oculto").hide("fast");
        $(".ii_processes li").removeClass("activo");

        $(this).addClass("activo");
        return false;
    });
    */

    $(document).on('click', '.activity-item', function () {
        $("#define_value li a").removeClass("activo");
        $(this).addClass("activo");


        var activityId = $(this).data('activityid');
        var assessmentSummaryId = $(this).data('assessmentsummaryid');
        
        selectedActivity = {
            AssessmentSummaryId: assessmentSummaryId,
            ActivityId: activityId,
            IsAdminUser: $('#NS_IsAdminUser').text()
        }
        LoadAboutThisActivities();
        
        
    });
    ///****FIN MODIFICACIONES NEWSOFT///
		
	










	
    /*!--===============================-->

        <!--NEW-->
	
    <!--===============================-->
    /*---Tabs industry insights processes---*/
            $(".ii_process").hide();
    //$(".ii_process:first").show();
            $(".ii_processes li:first h4").addClass("activo");

    //$(".ii_processes li h5").bind('click', function () {

    //    $("#define_value_contents .original").hide();
    //    $("#define_value_contents .izk .about_this").removeClass("activo");
    //    var linkIndex = $(".ii_processes li h5").index(this);
    //    console.log(linkIndex);
    //    $(".ii_processes li h5").removeClass("activo");
    //    $(".ii_process:visible").hide();
    //    $(".ii_process:eq("+linkIndex+")").show();
    //    $(this).addClass("activo");
    //    return false;
    //});


    //Carga el contenido de PROBLEMS / OPPORTUNITIES - DIGITAL TRANSFORMATIONS
    $(document).on('click', '.ii_processes li h5', function () {
        //$("#define_value_contents .original").hide();
        //$("#define_value_contents .izk .about_this").removeClass("activo");
        //var linkIndex = $(".ii_processes li h5").index(this);
        //console.log(linkIndex);
        //$(".ii_processes li h5").removeClass("activo");
        //$(".ii_process:visible").hide();
        //$(".ii_process:eq(" + linkIndex + ")").show();
        //$(this).addClass("activo");
        //return false;

        var processId = $(this).data('processid');


        if ($(this).parent().hasClass("activo")) {
            $(this).next(".oculto").hide("fast");
            $(this).parent().removeClass("activo");
            ShowAboutThisActivityPanel();
            return false;
        }
        else {
            $(".ii_processes li h5").not(this).parent().find(".oculto").hide("fast");
            $(".ii_processes li h5").not(this).parent().removeClass("activo");
            $(this).next(".oculto").show("fast");
            $(this).parent().addClass("activo");
            LoadProblemsAndDigitalTransformation(processId);
            return false;
        }
        

    });
		
		
		
		
		
	
	
	
	
    /*<!--===============================-->

        <!--NEW-->
	
    <!--===============================-->*/
    //$("#define_value_contents .izk .about_this").click(function () {
    //        ShowAboutThisActivityPanel();
    //        $(this).addClass("activo");
    //        $("#define_value_contents .ii_process").hide();
    //        $("#define_value_contents .original").show();
    //        $(".ii_processes li .oculto").hide("fast");
    //        $(".ii_processes li").removeClass("activo");
    //        return false;
    //    });		

        $("#define_value_contents .izk .about_this").click(function () {
            ShowAboutThisActivityPanel();
            
            return false;
        });		




	
		
		
		
		
	
    /*<!--===============================-->

        <!--NEW-->
	
    <!--===============================-->*/
        //$(".ii_processes li h5").click(function(){
        //    if($(this).parent().hasClass("activo")){
        //        $(this).next(".oculto").hide("fast");
        //        $(this).parent().removeClass("activo");
        //        return false;
        //    }
        //    else{
        //        $(".ii_processes li h5").not(this).parent().find(".oculto").hide("fast");
        //        $(".ii_processes li h5").not(this).parent().removeClass("activo");
        //        $(this).next(".oculto").show("fast");
        //        $(this).parent().addClass("activo");
        //        return false;
        //    }
    //});		
	
	
	
    /*<!-- Menú fijo al subir -->*/
	var $menu_y = $('#header.landing'), originalTop = $menu_y.offset().top;
    var $body_y = $('body.landing'), originalTop = $body_y.offset().top;
    $(window).scroll(function(e){
        if ($(this).scrollTop() > originalTop ){
            $menu_y.addClass('menu_fixed');
            $body_y.addClass('body_fixed');
        } else { 
            $menu_y.removeClass('menu_fixed');
            $body_y.removeClass('body_fixed');
        } 
    });













   /* <!--===============================-->*/
    $('#header .logo').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'fast');
        return false;
    });
	
	
	
	
	
	
	
	
	
    /*<!--===============================-->/*/
    $('#btn_solutions').on('click', function(){
        $('html, body').animate({scrollTop:$('#our_solutions').offset().top - 100}, 'normal');
        return false;
    });
	
	
	
	
	
	
	
	
   /* <!--===============================-->/*/
    $('.circulo a').on('click', function(){
        $('html, body').animate({scrollTop:$('#our_solutions').offset().top - 100}, 'normal');
        return false;
    });
	
	
	
	
	
	
    /*<!--===============================-->/*/
    $('#btn_products').on('click', function(){
        $('html, body').animate({scrollTop:$('#our_products').offset().top - 100}, 'normal');
        return false;
    });
	
	
	
	
	
	
    /*<!--===============================-->/*/
    $('#btn_plans').on('click', function(){
        $('html, body').animate({scrollTop:$('#plans').offset().top - 100}, 'normal');
        return false;
    });
	
	
	
	
	
    /*<!--===============================-->*/
        $('#btn_about_us').on('click', function(){
            $('html, body').animate({scrollTop:$('#about_us').offset().top - 100}, 'normal');
            return false;
        });
	
	
	
	
	
   /* <!--===============================-->*/
        $('#btn_contact_us').on('click', function(){
            $('html, body').animate({scrollTop:$('#footer').offset().top - 100}, 'normal');
            return false;
        });



    //Personalizaciones Newsoft
     




});


//Send final industry Insights
$(document).on('click', '#SendIndustryFinal', function () {

    loadingDiv.show();
    $.ajax({
        url: $('#NS_ValidateIndustryInsightsFinalURLCallback').text() + "?pAssessmentSummaryId=" + selectedActivity.AssessmentSummaryId,
        //data: JSON.stringify(pFilterModel),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
       .done(function (data) {
           if (data.error === true) {
               $('.opacidad').show();
               $('#modalErrorFinalIndustryInsights').css('z-index', 10001);
               $('#modalErrorFinalIndustryInsights').show();
           } else {
               quita_scroll_del_body();
               $(".opacidad").show();
               $('#modalConfirmSubmit').css('z-index', 10001);
               $("#modalConfirmSubmit").show();
           }
       })
       .fail(function (jqXHR, exception) {
           console.log(exception);
       })
       .always(function () {
           loadingDiv.hide();
       });

    return false;
});


$(document).on('click', '#SendIndustryFinalOK', function () {
    $('#IndustryInsightsForm').submit();
});





/*---modales---*/
/*--=======Funciones para quitar y poner el scroll en el body cuando se abren/cierran los modales===========-->*/
function quita_scroll_del_body() {
    $('body').addClass('sin_scroll');
}
function pone_scroll_del_body() {
    $('body').removeClass('sin_scroll');
}


function ShowAboutThisActivityPanel() {
    $("#define_value_contents .izk .about_this").addClass("activo");
    $("#define_value_contents .ii_process").hide();
    $("#define_value_contents .original").show();
    $(".ii_processes li .oculto").hide("fast");
    $(".ii_processes li").removeClass("activo");
}



function OpenCreateProcessModal() {
    loadingDiv.show();
    $.ajax({
        url: $('#NS_LoadCreateProcessModalURLCallback').text(),
        data: JSON.stringify(selectedActivity),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#CreateProcessContent').html(data);
        quita_scroll_del_body();
        $(".opacidad").show();
        $(".contenedor_add_process").show();
        $(".modal.add_process").show();
        $.validator.unobtrusive.parse('#CreateProcessForm');
    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });
}


function OpenEditProcessModal(processId) {
    loadingDiv.show();
    $.ajax({
        url: $('#NS_LoadUpdateProcessModalURLCallback').text() + "?pProcessId=" + processId,
        //data: JSON.stringify(selectedActivity),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#CreateProcessContent').html(data);
        quita_scroll_del_body();
        $(".opacidad").show();
        $(".contenedor_add_process").show();
        $(".modal.add_process").show();
        $.validator.unobtrusive.parse('#CreateProcessForm');
    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });
}


function CloseCreateProcessModal() {
    pone_scroll_del_body();
    $(".opacidad").hide();
    $(".contenedor_modal").hide();
    $(this).parent(".modal").hide();

}



function LoadProcesses() {
    loadingDiv.show();
    //Cargamos los procesos
    $.ajax({
        url: $('#NS_LoadProcessesURLCallback').text(),
        data: JSON.stringify(selectedActivity),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#processes-partial').html(data);
    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });
}

function LoadAboutThisActivities() {
    loadingDiv.show();
    //Cargamos la parcial de About this Activities
    $.ajax({
        url: $('#NS_LoadAboutThisActivitesURLCallback').text() + "?pActivityId=" + selectedActivity.ActivityId,
        //data: JSON.stringify(pFilterModel),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#about-this-activities').html(data);
        ShowAboutThisActivityPanel();
        LoadProcesses();

    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });
}

function LoadProblemsAndDigitalTransformation(IdProcess) {
    //Cargamos los problemas y transofrmaciones digitales
    loadingDiv.show();



    $.ajax({
        url: $('#NS_LoadProblemsAndDigitalTransformationURLCallback').text() + "?pProcessId=" + IdProcess + "&pAssessmentSummaryId=" + selectedActivity.AssessmentSummaryId + "&pIsAdminUser=" + selectedActivity.IsAdminUser,
        //data: JSON.stringify(pFilterModel),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    })
    .done(function (data) {
        $('#problems-and-digital-transformation').html(data);

        $("#define_value_contents .original").hide();
        $("#define_value_contents .izk .about_this").removeClass("activo");
        $(".ii_processes li h5").removeClass("activo");
        $(".ii_process:eq(0)").show();
        $(this).addClass("activo");
    })
    .fail(function (jqXHR, exception) {
        console.log(exception);
    })
    .always(function () {
        loadingDiv.hide();
    });
}