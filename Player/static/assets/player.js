const audioPlayer =$('#jp_audio_0')[0] ;
const controlplay = $('#control-play');
const controlpause = $('#control-pause');
let controlmute = $('#control-mute');
let controlunmute = $('#control-unmute');
const playListview = $($('#playList')[0]);
let currentPlaying = -1;
let playList = [];
let playingPK=-1
let repeat=true;
let urlContainer={}

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

    if(pk)playingPK=pk;
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
        if(d>=playList.length){d=0;if(!repeat)return;}
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

function playNextRepeat(){
  k=repeat;
  repeat=true;
  playNext();
  repeat=k;
}

$('#control-next').on('click',playNextRepeat);
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
        $(document.getElementById('control-volume')).css("width",(document.getElementById('volume').offsetWidth*audioPlayer.volume)+"px");
    }

})

controlmute.on('click',function(){audioPlayer.volume=document.getElementById('control-volume').offsetWidth/document.getElementById('volume').offsetWidth;});
controlunmute.on('click',function(){audioPlayer.volume=0;});


$('.jp-repeat').on('click',function(){
$('.jp-repeat-off').show('');
$('.jp-repeat').hide('');
repeat=true;
})


$('.jp-repeat-off').on('click',function(){
    $('.jp-repeat').show('');
    $('.jp-repeat-off').hide('');
    repeat=false;
})


function getSong(pk){

    if(urlContainer[pk]&&audioPlayer.src.endsWith(urlContainer[pk])){
        if(playingPK!=pk)
            play(urlContainer[pk],pk);

        audioPlayer.play();
        playingPK=pk;
        try{
          $('li a .icon-control-pause').css('display','none');
          $('li a .icon-control-play').css('display','inline');
          $('li[pk='+pk+']').find('a .icon-control-play').css('display','none ');
          $('li[pk='+pk+']').find('a .icon-control-pause').css('display','inline ');
        }catch(err){}
    }
else{
    $.ajax({
        type:'POST',
        url : "/getUrl",
        data : {
            what:'song',
            which:pk,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        success : function(dat){
            urlContainer[pk]=dat;
            if(playingPK!=pk){
            play(dat,pk);
            if(audioPlayer.paused)audioPlayer.play();
            }
            playingPK=pk;
        }
    });
}

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
            getPage('song');
            songShowAlbum(obj);
        }
    });
}

audioPlayer.addEventListener('timeupdate', function () {
    document.getElementById('control-progress').style.width = audioPlayer.currentTime * 100 / audioPlayer.duration + "%";
    document.getElementById('control-currentTime').innerHTML = parseInt(audioPlayer.currentTime / 60) + ':' + parseInt(audioPlayer.currentTime % 60);
    document.getElementById('control-duration').innerHTML = parseInt(audioPlayer.duration/60)+':'+parseInt(audioPlayer.duration%60)
})

$('#progress').on('click', function (e) {
    var rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width=this.offsetWidth;
    audioPlayer.currentTime=(x/width)*audioPlayer.duration;
})




$('#volume').on('click',function(e){

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    const width=x/this.offsetWidth;

    audioPlayer.volume=width;
})