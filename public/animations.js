//on butn press :
//  -clear the logo
//  -translate Y the search bar by adding a class to it so when it already is there is no effect
//  -clear screen and start displaying the skeleton
//  -when content is ready clear the skeleton
//  -and display the songs
//  -or display the errors
//  -thats it

function display_skeleton(){
    let main = document.querySelector('.main');
    main.innerHTML = '';

    main.innerHTML = 'loading...';
}