function addToPlayList(){
    alert('fff');
}


function showAlbum(data){
    let songContainer=$(document.getElementById('songContainer'));
    let albumName =$(document.getElementById('albumName'));
}

function playNow(ele){
    getSong($(ele).attr('pk'));
    ele.find('a .icon-control-pause').css('display','inline ');
    ele.find('a .icon-control-play').css('display','none');
}


function showAlbum(data){
    let container=$(document.getElementById('albumContainer'));

    container.append(' div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">    <div class="item">        <div class="pos-rlt">            <div class="bottom"><span                    class="badge bg-info m-l-sm m-b-sm">03:20</span></div>            <div class="item-overlay opacity r r-2x bg-black">                <div class="text-info padder m-t-sm text-sm"><i                        class="fa fa-star"></i> <i class="fa fa-star"></i> <i                        class="fa fa-star"></i> <i class="fa fa-star"></i> <i                        class="fa fa-star-o text-muted"></i></div>                <div class="center text-center m-t-n"><i pk=1                        class="icon-control-play i-2x"></i></div>                <div class="bottom padder m-b-sm"><a                        href="##"                        class="pull-right"> <i class="fa fa-heart-o"></i> </a> <a                        href="##"> <i                        class="fa fa-plus-circle"></i> </a></div>            </div>            <a href="##"><img                    src='+data[2]+' alt=""                    class="r r-2x img-full"></a></div>        <div class="padder-v"><a href="##"                                 class="text-ellipsis">'+data[0]+'</a> <a                href="##"                class="text-ellipsis text-xs text-muted">'+data[1]+'</a></div>    </div></div>');

}

