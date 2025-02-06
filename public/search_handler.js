async function search(){
  let sentence = document.getElementById('input').value;
  console.log('searching...');
  //while waiting for response
  display_skeleton();
  await getData(sentence);
}

async function getData(sentence) {
    const url = "server/get_song.php";
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: sentence,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const txt = await response.text();
      try {
        json = JSON.parse(txt);

        //display songs
        display_song(json);  
      } catch (error) {
        //display error received
        display_error(txt);
        console.log(txt);
      }
      
    } catch (error) {
      console.error(error.message);
    }
}

function display_song(json){
  let main = document.querySelector(".main");
  main.innerHTML = '';

  json.forEach(element => {
    create_song(element.name, element.artists[0].name, element.album.images[1].url, element.external_urls.spotify, main);
  });
}

function create_song(title, artist, image_url, link, main){
  
  let banner = document.createElement('div');
  banner.className = 'banner flex_center_row';
  banner.onclick = ()=>{
    location.href = link;
  }

  let image = document.createElement('div');
  image.className = 'image';
  let image_link = document.createElement('img');
  image_link.src = image_url;
  image.appendChild(image_link);

  let description = document.createElement('div');
  description.className = 'description flex_center_col';

  let song_div = document.createElement('div');
  song_div.className = 'name';
  let song_name = document.createElement('h2');
  song_name.innerHTML = title;
  song_div.appendChild(song_name);

  let artist_div = document.createElement('div');
  artist_div.className = 'artist';
  let artist_name = document.createElement('h3');
  artist_name.innerHTML = artist;
  artist_div.appendChild(artist_name);

  description.appendChild(song_div);
  description.appendChild(artist_div);

  banner.appendChild(image);
  banner.appendChild(description);

  main.appendChild(banner);
}

function display_error(error){
  let main = document.querySelector(".main");
  main.innerHTML = '';
    
  let p = document.createElement('p');
  
  p.innerHTML = error;
  main.appendChild(p);
}