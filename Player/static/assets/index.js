let audioPlayer =$('#jp_audio_0')[0] ;


$('.fa-play-circle').on('click',function(e){
    e.preventDefault();

    $.ajax({
        type:'POST',
        url : "/getUrl",
        data : {
            type:'song',
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
        },
        success : function(dat){
            audioPlayer.src=dat;
            audioPlayer.play();
            $('.jp-pause').hide();
            $('.jp-play').show();
        }
    });

    

});


