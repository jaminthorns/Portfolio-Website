$(document).ready(function() {
    $('body').on('submit', '.contact-form', send_message);
});

function send_message(event) {
    event.preventDefault();
    $('.contact-form .button').prop('disabled', true);

    // Send message
    $.post('/contact/', $(this).serialize())
     .done(function(reponse) {
        $('.contact-form .contact-input').prop('disabled', true);
        $('.contact-form .button').addClass('sent');
    });
}
