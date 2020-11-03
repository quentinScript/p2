let nomActeurs = [];
let valTime= 0;
let inputActor = false;


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

    //On attend .2s avant d'exécuter d'afficher preparation car sinon le crop d'imagebug
    setTimeout(preparation, 200);
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
    if (inputActor == false) {
        $('[data-button="add"]').toggleClass("show");
        $('.check').toggleClass('show');
        $('.hovAdd input').toggleClass('show');
    }
}

function addActor(){
    let saisie = document.getElementById('actor').value;
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
        $(".hovAdd").addClass("plus");
        document.getElementById('actor').value = "";
    }
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
    // console.log(valTime);
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
        cursor: "move"
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
