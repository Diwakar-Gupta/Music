let mainContent = $(document.getElementById('mainContent'));
let controlBar = $(document.getElementById('controlBar'));
let currentPage='';
let meta={    
}

function getPage(page){

function changeColor(page){
    switch(page){
        case 'index':
            $($('#sidebar')[0]).removeClass('bg-dark');
            $($('#sidebar')[0]).addClass('bg-light');break;
        case 'song':
            $($('#sidebar')[0]).removeClass('bg-light');
            $($('#sidebar')[0]).addClass('bg-dark');break;

    }
}

    if(meta[page]){
        if(currentPage!=page){
            $($('#controlBar')[0]).siblings().each(function(){$(this).fadeOut('slow')});
            meta[page].fadeIn('slow');
            currentPage=page;
            changeColor(page);
        }
        
    }

    else{
        $.ajax({
            type:'POST',
            url : "/getPage",
            data : {
                which:page,
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
            },
            success : function(dat){
                $($('#controlBar')[0]).siblings().each(function(){$(this).fadeOut('slow')});
                currentPage=page;
                mainContent.prepend(dat);
                meta[page]=$(mainContent.children()[0]);
                changeColor(page);
            }
        });
    }
}

$(document).ready(function () {
    getPage('song');
});

$("#searchSong").on("keyup", function() {
    let value = $(this).val().toLowerCase();
    playListview.children().filter(function() {
      $(this).toggle($(this).attr('name').toLowerCase().indexOf(value) > -1)
    });
});



document.getElementById('search').addEventListener('submit',function(e){
    e.preventDefault();
    getPage('song');
    let value=$(this).find('input').val().toLowerCase();

    $.ajax({
        type:'POST',
        url : "search",
        data : {
            what:value,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
        },
        success : function(dat){
            let info=JSON.parse(dat);
            $(document.getElementById('songContainer')).empty();
            info.forEach(e => {
                if(e.isSong){
                    songAddSong(e);
                }else{
                    songAddAlbum(e);
                }
            });

        }
    });

}
)


function playlistOnDropEvent(ev){
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    let songDetail={}
    songDetail.pk = ev.dataTransfer.getData("pk");
    songDetail.name = ev.dataTransfer.getData("name");
    songDetail.pic = ev.dataTransfer.getData("pic");
    if(songDetail.pk&&songDetail.name&&songDetail.pic)
    addSongToPlaylist(songDetail);
}

function dragoverPlaylist(ev){
    ev.preventDefault();
    // Set the dropEffect to move
    ev.dataTransfer.dropEffect = "move"
   }

function addSongToPlaylist(s){
    if(parseInt(s.pk)>0&&s.name&&s.pic){
        let add=true;
        playList.forEach(function(e){if(e.pk==parseInt(s.pk))add=false;})
        if(add){
        playListview.append('<li  pk='+s.pk+' name="'+s.name +'" onclick="playListSong('+s.pk+')" class="list-group-item    clearfix"> <a href="#" class="jp-play-me        pull-right m-t-sm        m-l text-md"> <i class="icon-control-play            text"></i> <i class="icon-control-pause            " style="display:none" ></i></a> <a href="#" class="pull-left        thumb-sm m-r"> <img src="'+ s.pic +'" alt="..."> </a><a class="clear" href="#"> <span class="block            text-ellipsis">'+s.name+'</span>    <!--small class="text-muted">by        Soph Ashe</small--></a> </li>');
        playList.push({name:s.name,pk:parseInt(s.pk)});
    }
    }
}