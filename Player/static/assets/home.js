let mainContent = $(document.getElementById('mainContent'));
let controlBar = $(document.getElementById('controlBar'));

let meta={
    index:false,
    song:false,
}

function getPage(page){

    if(meta[page]){
        $($('#controlBar')[0]).siblings().each(function(){$(this).fadeOut('slow')});
        meta[page].fadeIn('fast');
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
            }
        });
    }
}

$(document).ready(function () {
    getPage('song');
});