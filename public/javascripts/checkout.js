var stripe = Stripe('pk_test_L82kYwCdf54ZSprvQYsIjims');
var elements = stripe.elements();

var $form = $('#checkout-form')

$form.submit(function (event) {
    console.log("heeee")
    $('#charge-error').addClass('invisible');
    $form.find('button').prop('disabled',true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name:$('#card-holder')
    }, stripeResponseHandler);
    return false;
})

function stripeResponseHandler(status, response) {
    if(response.error){
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('invisible');
        $form.find('button').prop('disabled',false);

    }
    else {
        var token=response.id;
        console.log("token-"+token)

        $(form).append($('<input type="hidden" name="stripeToken"/>').val(token));

        $(form).get(0).submit();
    }
}


// ---------------------------------



//-----------------------------------