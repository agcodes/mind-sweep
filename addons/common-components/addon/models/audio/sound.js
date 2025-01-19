export default class Sound {
  load(fileName) {
    let id = fileName;
    id = id.replace('/', '_');
    id = id.replace('/', '_');
    id = id.replace('/', '_');
    id = id.replace('/', '_');
    id = id.replace('.', '_');

    let audioElement = document.getElementById(id);
    if (typeof audioElement === 'undefined' || audioElement === null) {
      //Create the audio tag
      audioElement = document.createElement("audio");
      audioElement.preload = "auto";

      audioElement.setAttribute("id", id);

      //Load the sound file (using a source element for expandability)
      const srcElement = document.createElement("source");
      srcElement.src = fileName;

      audioElement.appendChild(srcElement);

      document.body.appendChild(audioElement);
    }

    //It auto plays as a fallback
    audioElement.load();
    //audioElement.volume = 0.000000;
    audioElement.play();
  }
}
