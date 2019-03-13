let audioPlayer =$('#jp_audio_0')[0] ;
let controlplay = $('#control-play');
let controlpause = $('#control-pause');
let musicBar = $('.musicbar');
let controlmute = $('#control-mute');
let controlunmute = $('#control-unmute');
let playListview = $($('#playList')[0]);
let currentPlaying = -1;
let playList = [];  

$(function () {
    updatePlayList();
});

function updatePlayList(){
    let pc=playListview.children();
    playList=[];
    pc.each(function(i){
        let ths=$(pc[i])
        let obj={};
        obj.name=ths.attr('name');
        obj.pk=parseInt(ths.attr('pk'));
        playList.push(obj);
    })

}

function play(url){
    audioPlayer.src=url;
    audioPlayer.play();
}

function playNext(){
    let d=currentPlaying;
    if(playList.length!=0){
        d++;
        if(d>=playList.length)d=0;
        currentPlaying=d;
        getSong(playList[d].pk);
    }
}

function playPrevious(){
    let d=currentPlaying;
    if(playList.length!=0){
        d--;
        if(d<0)d=playList.length-1;
        currentPlaying=d;
        getSong(playList[d].pk);
    }
}

$('#control-next').on('click',playNext);
$('#control-previous').on('click',playPrevious);

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


$("#searchSong").on("keyup", function() {
      let value = $(this).val().toLowerCase();
      playListview.children().filter(function() {
        $(this).toggle($(this).attr('name').toLowerCase().indexOf(value) > -1)
      });
});
  

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