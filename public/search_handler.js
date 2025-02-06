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
  console.log(json);
  
  let main = document.querySelector(".main");
  main.innerHTML = '';
  json.forEach(element => {
    create_song(element.name, main);
  });
}

function create_song(title, main){
  //TO DO : create banner properly and clickable
  
  let p = document.createElement('p');
  
  p.innerHTML = title;
  main.appendChild(p);
}

function display_error(error){
  let main = document.querySelector(".main");
  main.innerHTML = '';
    
  let p = document.createElement('p');
  
  p.innerHTML = error;
  main.appendChild(p);
}