$(document).ready(function () {
    $(document).on("click", "#cancelPlan", function () {

        $(".opacidad").show();

        $(".contenedor_cancel_subscription").show();
        $(".modal").show();
    })

    $(document).on("click", ".contenedor_modal .cerrar", function () {

        $(".opacidad").hide();

        $(".contenedor_cancel_subscription").hide();
        $(".modal").hide();
    })
})