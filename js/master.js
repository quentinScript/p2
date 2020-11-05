let nomActeurs = [];
let valTime= 0;
let inputActor = false;
let actorCheck = 0;


$(document).ready(function(){
    // timeline prend la largeur width:100%
    $(".toggleTimeline").click(timelineShow);
    // reduire la taille d'une classe dans l'inspecteur
    $("[data-toggle-show]").click(toggleShowInspecteur);
    // acteur choix ou non
    $("[data-button]:not([data-button='add'])").click(buttonActor);
    sliderRange();
    //share
    $('.headerDroite [data-button],#close, .full').click(overlay);
    cropImage();
    // resize + draggable
    resizeElement();
    // affecter les noms aux tracklet
    $('[data-rect]').hover(rectHover);
    // ajout acteurs
    $('.hovAdd').mouseenter(mouseEnterActor).mouseleave(mousLeaveActor);
    // ajouter un acteur avec bouton check ou la touche entrer
    $('.check').click(addActor);
    $("#actor").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            addActor();
        }
    });
    //menu
    $('#edit').click(edit);
    $('#preparation').click(preparation);

    //On attend .3s avant d'exécuter d'afficher preparation car sinon le crop d'imagebug
    setTimeout(preparation, 300);
    // popup
    setTimeout(function(){
        $('#popUpAddActor').removeClass("hide");
    }, 1000);
});

function mousLeaveActor(){
    // si input vide reset sinon il reste visible
    if (document.getElementById('actor').value == '') {
        inputActor = false;
        mouseEnterActor();
    }else{ inputActor = true;
    }
}

function mouseEnterActor(){
    // remove popup
    $('#popUpAddActor').addClass('hide');
    // si l'input est vide
    if (inputActor == false) {
        $('[data-button="add"]').toggleClass("show");
        $('.check').toggleClass('show');
        $('.hovAdd input').toggleClass('show');
    }
}

function addActor(){
    let saisie = document.getElementById('actor').value;
    let close = "<div data-button='0'><span class='iconify' data-inline='false' data-icon='gg:close'style='background-color:#E4E1E8; border-radius: 2px;color: #628C6E;cursor:pointer'></span></div>";
    if (saisie != "") {

        nomActeurs.push(saisie);
        let html="";
        let htmlIspecteur="";
        for (var i = 0; i < nomActeurs.length; i++) {
            html += "<div>"+nomActeurs[i]+"</div>";
            htmlIspecteur += "<div data-button='0'>"+nomActeurs[i]+"</div>";
        }
        $('.timePerso').html(html);
        $('#actors').html(htmlIspecteur);
        $('[data-show="0"]').html(htmlIspecteur);
        //rect assigne
        $('[data-rect]').html(close + htmlIspecteur);
        $(".hovAdd").addClass("plus");
        document.getElementById('actor').value = "";
    }
}

function rectHover(){
    let select = $(this).data('rect');
    $('[data-rect="'+select+'"] [data-button]').toggleClass('hide');
    // au click afficher les != actors
    $('[data-rect] [data-button]').click(function rect(){
        $('[data-rect="'+select+'"]').addClass('ok');
        //si tous acteurs ont été assigné  > popup moment suivant
        if ($('[data-rect="0"]').hasClass('ok') && $('[data-rect="1"]').hasClass('ok')) {
            $('#popUpSuivant').removeClass('hide');
        }
    });
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
}

function cropImage(){
    let   cropper = null;

    const myGreatImage = document.getElementById('image');
    const croppedImage = document.getElementById("croppedImage");

    cropper = new Cropper(myGreatImage,{
        aspectRatio : 16/9,
        zoomable:false,
        crop(event) {
            const canvas = this.cropper.getCroppedCanvas();
            croppedImage.src = canvas.toDataURL('image/png');
        }
    });
}

function resizeElement(){
    $(".apercuFinal").resizableSafe({
        handleSelector: ".splitter",
        resizeHeight: false
    });

    $( ".inspecteur").resizable({
        minWidth: 300
    });

    // $("#colApercu").resizable({
    //     handleSelector: ".controls",
    //     resizeWidth: false
    // });

    //share overlay
    $( ".overlay" ).draggable({
        containment: "document",
        cursor: "move"
    });

    // curseur timeline + màj timecode
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

function edit(){
    $('#apercuEditGlobal').removeClass('hide');
    $('#popUpAddActor').addClass('hide');
    $("#preparation").removeClass("show");
    $("#edit").addClass("show");
    $('.timeSound').removeClass("prepa");
    $('.timePerso').removeClass("prepa");
    $('.inspecteur .block:not(.prepa)').css('display','block');
    $('.inspecteur .block.prepa').css('display','none');
    $('#apercuPrepa').addClass('none');
    $('#apercuEditGlobal').removeClass('none');
    $('#popUpSuivant').addClass('hide');
    $('#prepaSuivant').addClass('none');

}

function preparation(){
    $("#preparation").addClass("show");
    $("#edit").removeClass("show");
    $('.timeSound').addClass("prepa");
    $('.timePerso').addClass("prepa");
    $('.inspecteur .block:not(.prepa)').css('display','none');
    $('.inspecteur .block.prepa').css('display','block');
    $('#apercuPrepa').removeClass('none');
    $('#apercuEditGlobal').addClass('none');
    $('#prepaSuivant').removeClass('none');

}
