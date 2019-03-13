let mainContent = $(document.getElementById('mainContent'));
let controlBar = $(document.getElementById('controlBar'));


function getPage(page){
    $.ajax({
        type:'POST',
        url : "/getPage",
        data : {
            which:page,
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()  
        },
        success : function(dat){
            mainContent.children()[0].remove();

            mainContent.prepend(dat);
            
        }
    });
}

$(document).ready(function () {
    getPage('song');
});