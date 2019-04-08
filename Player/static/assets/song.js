function addToPlayList(){
    alert('fff');
}


function songShowAlbum(data){
    let albumHeader=$(document.getElementById('songAlbumHeader'));

    albumHeader.find('span[class="h2 font-thin"]').text(data.name);
    albumHeader.find('img').attr('src',data.pic);

    let songContainer=$(document.getElementById('albumSongContainer'))
    songContainer.empty();
    data.songs.forEach(s => {
        songContainer.append('<li draggable="true" ondragstart="dragstart_handler(event);" pk='+s.pk+' name="'+s.name+'" pic="'+s.pic+'" onclick="playNow('+s.pk+')" class="list-group-item">        <div class="pull-right m-l"> <a href="#" class="m-r-sm"><i                                 class="icon-cloud-download"></i></a> <a                        href="#" class="m-r-sm"><i                                class="icon-plus"></i></a> <a                        href="#"><i class="icon-close"></i></a> </div>        <a href="#" class="jp-play-me m-r-sm pull-left"> <i                        class="icon-control-play text"></i> <i           onclick="controlpause.click();"             class="icon-control-pause text" style="display:none"></i> </a>        <div class="clear text-ellipsis"> <span>'+ s.name +'</span> <span                        class="text-muted"> --</span> </div></li>');    
    });
    
}



function songAddSong(song){
    let container=$(document.getElementById('songContainer'));
    container.append('<li draggable="true" ondragstart="dragstart_handler(event);" pk='+song.pk+' name="'+song.name+'" pic="'+song.pic+'" onclick=playNow('+song.pk+')  class="list-group-item clearfix ">    <a href="#"           class="jp-play-me pull-right m-t-sm m-l text-md "> <i                  class="icon-control-play text"></i>           <i onclick="controlpause.click();" class="icon-control-pause text" style="display:none" ></i> </a> <a            href="#" class="pull-left thumb-sm m-r"> <img                    src="'+song.pic+'" alt="..."> </a> <a            class="clear" href="#"> <span                    class="block text-ellipsis">'+song.name+'</span>            <small class="text-muted">by'+ song.author+'</small> </a> </li>');
}

function songAddAlbum(album){
    let container=$(document.getElementById('songContainer'));
    container.append('<li pk='+album.pk+' name="'+album.name+'" pic="'+album.pic+'" onclick=getAlbum('+album.pk+')  class="list-group-item clearfix ">    <a href="#"           class="jp-play-me pull-right m-t-sm m-l text-md "> <i                  class="icon-control-play text"></i>           <i onclick="controlpause.click();" class="icon-control-pause text" style="display:none" ></i> </a> <a            href="#" class="pull-left thumb-sm m-r"> <img                    src="'+album.pic+'" alt="..."> </a> <a            class="clear" href="#"> <span                    class="block text-ellipsis">'+album.name+'</span>            <small class="text-muted">by'+ album.author+'</small> </a> </li>');
}


function dragstart_handler(ev) {
    // Add the drag data
    ev.dataTransfer.setData("pk", $(ev.target).attr('pk'));
    ev.dataTransfer.setData("name", $(ev.target).attr('name'));
    ev.dataTransfer.setData("pic", $(ev.target).attr('pic'));
    ev.dataTransfer.dropEffect = "move";
}
