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