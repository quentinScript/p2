let nomActeurs = [];
let valTime= 0;
let inputActor = false;


$(document).ready(function(){
    $(".toggleTimeline").click(timelineShow);
    $("[data-toggle-show]").click(toggleShowInspecteur);
    $("[data-button]:not([data-button='add'])").click(buttonActor);
    sliderRange();
    $('.headerDroite [data-button], .cross, .full').click(overlay);
    cropImage();
    resizeElement();
    $('.hovAdd').mouseenter(mouseEnterActor).mouseleave(mousLeaveActor);
    $('.check').click(addActor);
});

function mousLeaveActor(){
    if (document.getElementById('actor').value == '') {
        inputActor = false;
        mouseEnterActor();

    }else{ inputActor = true}
}

function mouseEnterActor(){
    if (inputActor == false) {
        $('[data-button="add"]').toggleClass("show");
        $('.check').toggleClass('show');
        $('.hovAdd input').toggleClass('show');
    }
}

function addActor(){
    let saisie = document.getElementById('actor').value;
    nomActeurs.push(saisie);
    let html="";
    let htmlIspecteur="";
    for (var i = 0; i < nomActeurs.length; i++) {
        html += "<div>"+nomActeurs[i]+"</div>";
        htmlIspecteur += "<div data-button='0'>"+nomActeurs[i]+"</div>";
    }
    $('.timePerso').html(html);
    $('#actors').html(htmlIspecteur);
    $(".hovAdd").addClass("plus");
    document.getElementById('actor').value = "";
}


function timelineShow(){
    $(".inspecteur").toggleClass("show");
    $(".timeline").toggleClass("show");
    $(".toggleTimeline [data-icon]").toggleClass("none");
}


function toggleShowInspecteur(){
    let select = $(this).data('toggle-show');
    $('[data-toggle-show="'+select+'"]').toggleClass('none');
    $('[data-toggle-show="'+select+'"]').toggleClass('marg');
    $('[data-show="'+select+'"]').toggleClass('none');
}

function buttonActor(){
    let select = $(this).data('button');
    $("[data-button='"+select+"']").toggleClass("show");
}

function sliderRange(){
    var range = $("#range").attr("value");
    // $("#demo").html(range);
    $("[data-slide]").css("width", "50%");
    $(document).on('input change', '[data-range]', function() {
        // $('#demo').html( $(this).val() );
        var slideWidth = $(this).val() * 100 / 50000;

        $("[data-slide='"+$(this).data('range')+"']").css("width", slideWidth + "%");
    });
}

function overlay(){
    $('.overlay').toggleClass('none');
    $('.parent').toggleClass('disable');
    $('.full').toggleClass('none');
}

function timeline(){
    valTime = $(".blockTime").css('left');
    console.log(valTime);
}

function cropImage(){
    // var $image = $('#image');
    let   cropper = null;
    const myGreatImage = document.getElementById('image');
    const croppedImage = document.getElementById("croppedImage");

    cropper = new Cropper(myGreatImage,{
        aspectRatio : 16/9,
        // scalable : false
        zoomable:false,
        crop(event) {
            const canvas = this.cropper.getCroppedCanvas();
            croppedImage.src = canvas.toDataURL('image/png');
        }
    });

    // $image.cropper({
    //     aspectRatio: 16 / 9,
    //     crop: function(event) {
    //         console.log(event.detail.x);
    //         console.log(event.detail.y);
    //         console.log(event.detail.width);
    //         console.log(event.detail.height);
    //         console.log(event.detail.rotate);
    //         console.log(event.detail.scaleX);
    //         console.log(event.detail.scaleY);
    //         const canvas = this.cropper.getCroppedCanvas();
    //         croppedImage.src = canvas.toDataURL('image/png');
    //     }
    // });
    // var cropper = $image.data('cropper');
}

function resizeElement(){
    $(".apercuFinal").resizableSafe({
        handleSelector: ".splitter",
        resizeHeight: false
    });

    $( ".inspecteur").resizable({
        minWidth: 300
    });

    // $("#rectEdit").draggable({
    //     containment: ".imgEdit",
    //     cursor: "crosshair",
    // }).resizable({
    //     aspectRatio: 16 / 9
    // });

    // $("#colApercu").resizable({
    //     handleSelector: ".controls",
    //     resizeWidth: false
    // });

    $( ".overlay" ).draggable({
        containment: "document",
        cursor: "crosshair"
    });
    $( ".blockTime" ).draggable({
        axis: "x",
        containment: ".time2",
        drag: function(event, ui) {
            $('.navTimeline').css('transform','translateX('+ui.position.left+'px)');
            let minute = ui.position.left;
            let heure = Math.floor(ui.position.left/60);
            minute -= heure*60;
            if (minute<10) {
                minute = '0'+minute
            }if (heure<10) {
                heure = '0'+heure
            }
            $('.timeCode p').text('00:'+heure+':'+minute);
        }
    });
}

function preparation(){

}

function cropImag2(){
    let cropper = null;
}

function inputText(){

    function show() {
        var p = document.getElementById('pwd');
        p.setAttribute('type', 'text');
    }

    function hide() {
        var p = document.getElementById('pwd');
        p.setAttribute('type', 'password');
    }

    var pwShown = 0;

    document.getElementById("eye").addEventListener("click", function () {
        if (pwShown == 0) {
            pwShown = 1;
            show();
        } else {
            pwShown = 0;
            hide();
        }
    }, false);
}
