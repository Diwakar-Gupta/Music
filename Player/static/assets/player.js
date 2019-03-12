let audioPlayer =$('#jp_audio_0')[0] ;
let controlplay = $('#control-play');
let controlpause = $('#control-pause');
let musicBar = $('.musicbar');
let controlmute = $('#control-mute');
let controlunmute = $('#control-unmute');


function play(url){
    audioPlayer.src=url;
    audioPlayer.play();
}

$(controlpause).on('click',function(){audioPlayer.pause();});

$(controlplay).on('click',function(){audioPlayer.play();});

audioPlayer.onpause=function(){
    controlpause.hide();
    controlplay.show();
    musicBar.removeClass('animate');
}

audioPlayer.onplay=function(){
    controlplay.hide();
    controlpause.show();
    musicBar.addClass('animate');
}

audioPlayer.addEventListener('volumechange',function(){
    if(audioPlayer.volume==0){
        controlunmute.hide();
        controlmute.show();
    }
    else{
        controlmute.hide();
        controlunmute.show();
    }

})

controlmute.on('click',function(){audioPlayer.volume=1;});
controlunmute.on('click',function(){audioPlayer.volume=0;});

function getSong(pk){
    $.ajax({
        type:'POST',
        url : "/getUrl",
        data : {
            what:'song',
            which:pk,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
        },
        success : function(dat){
            play(dat);            
        }
    });
}

function getAlbum(pk){
    $.ajax({
        type:'POST',
        url : "/getUrl",
        data : {
            what:'album',
            which:pk,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
        },
        success : function(dat){
            
            let obj=JSON.parse(dat);

            showAlbum(obj);
            
        }
    });
}