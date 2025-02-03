async function search(){
  let sentence = document.getElementById('input').value;
  console.log('searching...');
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
        json.forEach(element => {
          display(element.name);
          display('------------------------------------------------------');
        });
        
      } catch (error) {
        //display error received
        console.log(txt);
      }
      
      
    } catch (error) {
      console.error(error.message);
    }
}

function display(string){
  let song = document.createElement('p');
  song.innerHTML = string;
  document.querySelector(".main").appendChild(song);
}