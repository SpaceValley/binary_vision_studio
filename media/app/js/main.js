$(document).ready(function(){

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


   
    window.fnames = new Array();
    window.ftypes = new Array();
    fnames[0] = 'EMAIL';
    ftypes[0] = 'email';
    var $mcj = jQuery.noConflict(true);


document.getElementsByClassName('about__getGuideBtn')[0].addEventListener('click',saveEmail);
function saveEmail() {

    let authenticationString = btoa('27d865822c65f73aece507901796aaf2-us14');
    authenticationString = "Basic " + authenticationString;

    fetch('https://us14.api.mailchimp.com/3.0/lists/166105/members', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'authorization': authenticationString,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: document.getElementsByClassName('about__emailField')[0].value,
            status: "subscribed",
        })
    }).then(function(e){
        console.log("fetch finished")
    }).catch(function(e){
        console.log("fetch error");
    })
}

var rssUrl = 'https://medium.com/feed/@binary.vision/';
fetch('https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl,{method:'GET'})
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
        const wrappers = $("#newWrapper .articles__sliderWrapBlock .articles__sliderCardInner")
        let deleteArr = []
        for (let i = 0; i < wrappers.length; i++) {
            const element = wrappers[i];
            console.log(element)
            if(resp.items[i] === undefined) deleteArr.push($("#newWrapper .articles__sliderCardWrap")[i])
            else $(element).append(`
                <a href="${resp.items[i].link}" style="cursor: pointer; position: relative; width: 100%; height: 100%">
                    <h5 style="position: absolute; color: #fff; z-index: 20;">${resp.items[i].title}</h5>
                    <img src="${resp.items[i].thumbnail}" class="articles__img"/>
                </a>
            `)
        }
        deleteArr.forEach(elem => $(elem).remove())
    }).catch(function(e){
        console.log(e);
    })

    var instrssUrl = 'https://web.stagram.com/rss/n/binaryvisionstudios';
    fetch('https://api.rss2json.com/v1/api.json?rss_url=' + instrssUrl,{method:'GET'})
        .then(function (resp) {
            return resp.json();
        })
        .then(function (resp) {
            let deleteArr = []
            const wrappers = $("#newWrapper2 .articles__sliderWrapBlock .articles__sliderCardInner")
            for (let i = 0; i < wrappers.length; i++) {
                const element = wrappers[i];
                if(resp.items[i] === undefined) deleteArr.push($("#newWrapper2 .articles__sliderCardWrap")[i])
                else $(element).append(`<img src="${resp.items[i].thumbnail}" class="articles__img"/>`)
            }
            deleteArr.forEach(elem => $(elem).remove())
        })
        .catch(function(e){
            console.log(e);
        })

        $("#newWrapper").mThumbnailScroller({
            axis:"x",
        });
        
        $("#newWrapper").mThumbnailScroller(
            "scrollTo",
            `-=${-$(".sliderWrap").width() + ($("html").width() / 2)}`
            );
        
        $("#newWrapper2").mThumbnailScroller({
            axis:"x",
        });
        $("#newWrapper2").mThumbnailScroller("scrollTo",`-=${$("html").width() / 2}`);
        

});
