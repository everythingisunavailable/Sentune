function create_skeleton(main){
    let banner = document.createElement('div');
    banner.className = 'banner flex_center_row';

    let highlight = document.createElement('div');
    highlight.className = 'highlight';

    let image = document.createElement('div');
    image.className = 'image';

    let description = document.createElement('div');
    description.className = 'description flex_center_col';
    let skeleton_name = document.createElement('div');
    skeleton_name.className = 'skeleton_name';
    let skeleton_artist = document.createElement('div');
    skeleton_artist.className = 'skeleton_artist';
    
    description.appendChild(skeleton_name);
    description.appendChild(skeleton_artist);

    banner.appendChild(highlight);
    banner.appendChild(image);
    banner.appendChild(description);
    
    main.appendChild(banner);
}

function display_skeleton(){
    let main = document.querySelector('.main');
    main.innerHTML = '';
    let nr = 2;
    for(let i = 0; i < nr; i++){
        create_skeleton(main);
    }
}