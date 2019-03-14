let audioPlayer =$('#jp_audio_0')[0] ;
let controlplay = $('#control-play');
let controlpause = $('#control-pause');
let controlmute = $('#control-mute');
let controlunmute = $('#control-unmute');
let playListview = $($('#playList')[0]);
let currentPlaying = -1;
let playList = [];  
let playingPK=-1

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



function play(url,pk){
    if(audioPlayer.src!=url)
    audioPlayer.src=url;
    
    try{
    $('li a .icon-control-pause').css('display','none');
    $('li a .icon-control-play').css('display','inline');
    $('li[pk='+pk+']').find('a .icon-control-play').css('display','none ');
    $('li[pk='+pk+']').find('a .icon-control-pause').css('display','inline ');
    }catch(err){}
    audioPlayer.play();
}

function playListSong(pk){
    getSong(pk);
    let index=0;
    for(index=0;index<playList.length;index++)
        if(playList[index].pk==pk){
        currentPlaying=index;
        break;
    }
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
    $('.musicbar').removeClass('animate');
}

audioPlayer.onplay=function(){
    controlplay.hide();
    controlpause.show();
    $('.musicbar').addClass('animate');
}

audioPlayer.addEventListener('ended',playNext);

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

controlmute.on('click',function(){audioPlayer.volume=document.getElementById('control-volume').value/10;});
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
            if(playingPK!=pk)
            play(dat,pk);    
            playingPK=pk;
            $('li a .icon-control-pause').css('display','none');
            $('li a .icon-control-play').css('display','inline');
            $('li[pk='+pk+']').find('a .icon-control-play').css('display','none ');
            $('li[pk='+pk+']').find('a .icon-control-pause').css('display','inline ');        
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

document.getElementById('control-volume').onchange=function(){

    audioPlayer.volume=this.value/10;
}
