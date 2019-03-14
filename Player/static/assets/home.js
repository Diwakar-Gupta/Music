let mainContent = $(document.getElementById('mainContent'));
let controlBar = $(document.getElementById('controlBar'));

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
        $($('#controlBar')[0]).siblings().each(function(){$(this).fadeOut('slow')});
        meta[page].fadeIn('slow');
        changeColor(page);
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