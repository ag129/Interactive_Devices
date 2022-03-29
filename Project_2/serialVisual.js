//var desired_x = Math.floor(Math.random()*400)+50
//var desired_y = Math.floor(Math.random()*400)
//console.log(desired_x)
//console.log(desired_y)


//when the user clicks anywhere on the page
document.addEventListener('click', async () => {
  // Prompt user to select any serial port.
  var port = await navigator.serial.requestPort();
  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });

  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;

  reader = inputStream.getReader();
  $("#emotion").text("I don't like this color :(")
  let song_object = document.getElementById("song"); 
  song_object.play(); 
  readLoop();

});


async function readLoop() {
  while (true) {
    const { value, done } = await reader.read();
    console.log(value)
    if (done) {
      // Allow the serial port to be closed later.
      //console.log("closing connection")
      reader.releaseLock();
      //break;
    }
    try{
      //console.log(value)
      let s = value
      if (value.charAt(0) == "{")
      {
        while(! (s.includes("}"))){
          // console.log("length")
          // console.log(s.length)
          // console.log("check")
          // console.log(s.charAt(s.length-1))
          const { value, done } = await reader.read();
          s = s.concat(value);
          console.log(s);
        }
        parseAndDisplay(s)

      }
      else{
        continue;
      }
      // {
      //   //console.log("here!!!!!!")
      //   let str1 = "{"
      //   let value2 = str1.concat(value)
      //   //console.log("new value")
      //   //console.log(value2)
      //   parseAndDisplay(value2)
      // }
      // else{
      //   parseAndDisplay(value)
      // }
    }
    catch(error){
      continue
    }
  }
};


async function parseAndDisplay(v){
  try{
    var d = JSON.parse(v)
    console.log(d)
  }
  catch(error)
  {
    console.log("there was an error")
    return;
  }
  const synth = new Tone.Synth().toDestination();
  let x = d["x"]
  //console.log(x)
  let y = d["y"]
  //console.log(y)
  let bPressed = d["bPressed"]
  let jPressed = d["jPressed"]
  //console.log(jPressed)
  // if(jPressed == 1){
  //   document.body.style.backgroundColor = 'rgb(0,  0, 0)';
  // }
  // else{
  //   document.body.style.backgroundColor = 'rgb(255,  255, 255)';
  // }
  let simple_x = Math.floor(x/10+50)
  let simple_y = Math.floor(y/10)
  let combo = Math.abs(simple_x-simple_y)
  //console.log(simple_x)
  //console.log(simple_y)
  //console.log(combo)
  document.body.style.backgroundColor = 'rgb(' + simple_x + ', '+simple_y+', '+combo+')';
  
  // if((Math.abs(simple_x -desired_x) < 30) && (Math.abs(simple_y- desired_y) <30))
  // {
  //   console.log("did it!")
  // }

  if(jPressed == 1){
    document.body.style.backgroundColor = 'rgb(' + Math.floor(Math.random()*255) + ', '+Math.floor(Math.random()*255)+', '+Math.floor(Math.random()*255)+')';
  }

  if(bPressed == 1){
    $('#confetti').show()
    $('#text').text("")
    //synth.triggerAttackRelease(49, "3n", Tone.now()+1/8000);
  }
  else{
    $('#confetti').hide()
    $('#text').text("Celebrate yourself!")
  }


  let the_song = document.getElementById("song"); 
  the_song.volume = d["pValue"]/4095
}

