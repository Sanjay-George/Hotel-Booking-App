// STARS PART
// hovering 
$('.star-row').find('.star').hover(function () {
    var value = parseInt($(this).attr("data-value"));
    // check if clicked, then no hover effect
    if (!$('.star-row').hasClass('clicked') || value > parseInt($('#rating').val())) {
        //first remove color for all stars greater than hovered
        for (var i = 6; i >= value; i--) {
            $('.star-row .star:nth-child(' + i + ')').removeClass('star-hover');
        }
        //add color to all star below and equal to hovered 
        for (i = 1; i <= value; i++) {
            $('.star-row .star:nth-child(' + (i + 1) + ')').addClass('star-hover');
        }
    }
}, function () {
    // on hoverout clear all stars
    // check if clicked, then don't clear, else clear
    var value = parseInt($(this).attr("data-value"));
    var clickedValue = parseInt($('#rating').val());
//    console.log(clickedValue);
    if ($('.star-row').hasClass('clicked') && value > clickedValue) {
        for (i = 6; i > clickedValue + 1; i--) {
            $('.star-row .star:nth-child(' + i + ')').removeClass('star-hover');
        }
    }
    else if (!$('.star-row').hasClass('clicked')) {
        for (i = 6; i >= 1; i--) {
            $('.star-row .star:nth-child(' + i + ')').removeClass('star-hover');
        }
    }
});
// on click
$('.star-row').find('.star').click(function () {
    var value = parseInt($(this).attr("data-value"));
    //first remove color for all stars greater than hovered
    for (var i = 6; i >= value; i--) {
        $('.star-row .star:nth-child(' + i + ')').removeClass('star-hover');
    }
    //add color to all star below and equal to hovered 
    for (var i = 1; i <= value; i++) {
        $('.star-row .star:nth-child(' + (i + 1) + ')').addClass('star-hover');
    }
    // also give selected value to hidden input rating
    $('#rating').val(value);
    $('.star-row').addClass('clicked');
});