(function() {
    AOS.init({
        duration: 2000,
        offset: 300,
        once: true
    })

    function scrollDown(e) {
        e.preventDefault();

        var position = $("#about").offset().top;

        $("body, html").animate({
            scrollTop: position
        } ,2000 );
    }
    $(".arrow").click(scrollDown);

    $(".header__bottomLabel").click(scrollDown);

    $("#thumbs").mThumbnailScroller({
        axis:"x"
    });
})()