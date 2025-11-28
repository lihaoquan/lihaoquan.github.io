$(document).ready(function () {
    $('.close').click(function () {
        $(this).parent().parent().parent().parent().hide();
        $('body').removeClass('modal-open')
    });

    const MODAL_ID = ['mrms', 'ttts', 'ark', 'gAAAme', 'vandetta', 'scorchborne', 'tjthink', 'sifrjp', 'codefest', 'bobhafiz', 'katrinachandy', 'jmcustomized', 'homecooking', 'nusgdg']

    MODAL_ID.forEach(item => {
        $('.' + item).click(function () {
            $('#' + item).show();
            $('body').addClass('modal-open')
        });
    })

    $('.gallery-images > .swap-img').click(function () {
        $(this).parent().parent().find('.gallery-selected-image').html($(this).clone())
    });

    $('.video').click(function () {
        $(this).parent().parent().parent().find('.gallery-selected-image').html($(this).find('iframe').clone());
    })
});
