$(document).ready(function () {

    $(document).on('change', '#promotionalCodeCheck', function () {
        var check = $('#promotionalCodeCheck:checked').length > 0;
        if (check) {
            $('#paypal-checkout-button').hide('fade-out');
            loadingDiv.show();
            $.ajax({
                url: $('#NS_PromoCodeModalUrl').text(),
                //data: JSON.stringify(pFilterModel),
                type: 'GET'
            })
            .done(function (data) {
                
                $("#promotional_code_content").html(data);

                $(".opacidad").show();
                
                $(".contenedor_promotional_code").show();
                $(".modal").show();

            })
            .fail(function (jqXHR, exception) {
                console.log(exception);
            })
            .always(function () {
                loadingDiv.hide();
            });

           

           
        } else {
            $('#paypal-checkout-button').show('fade-in');
        }
    });

    $(document).on("click", ".contenedor_modal .cerrar", function () {
        $("#promotionalCodeCheck").prop("checked", false);
        $('#paypal-checkout-button').show('fade-in');
        $("#promotional_code_content").html("");

        $(".opacidad").hide();

        $(".contenedor_promotional_code").hide();
        $(".modal").hide();
    });

    $(document).on('submit', "#frmActivatePromoCodeSuccess", function () {
        loadingDiv.show();
    })
});

function OnBeginPromoCodeForm() {
    loadingDiv.show();
}

function OnSuccessPromoCodeForm() {
}

function OnFailurePromoCodeForm() {
}

function OnCompletePromoCodeForm() {
    loadingDiv.hide();
}