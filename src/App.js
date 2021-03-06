import React, { Component, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
 const [message, setMessage] = useState('');
 const [isLoaded, setIsLoaded] = useState(false);
 const [items, setItems] = useState([]);
 const {
  transcript,
  interimTranscript,
  finalTranscript,
  resetTranscript,
  listening,
} = useSpeechRecognition();

const url = "https://libretranslate.com/translate?";

const requestOptions = {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json' },
};

var finalText="";

  useEffect(() => {
    listenContinuously()
    
      if (finalTranscript !== '') {
        console.log('Got final result:', finalTranscript);
        var data = 'q='+ finalTranscript +'&source=de&target=en';
        resetTranscript()
            fetch(url + data, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              finalText = result.translatedText
              document.querySelector("h1").innerHTML = finalText
              setIsLoaded(true);
              setItems(result);
            }
          )
      }


  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

 const listenContinuously = () => {
   SpeechRecognition.startListening({
     continuous: true,
     language: 'de-DE',
   });
 };

 return (
   <div style={{backgroundColor: 'green'}}>
     <div>
       <span style={{  }}>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
         <button type="button" onClick={resetTranscript}>Reset</button>
         <button type="button" onClick={listenContinuously}>Listen</button>
         <button type="button" onClick={SpeechRecognition.stopListening}>Stop</button>
       </div>
     </div>
     <div>{listenContinuously}
       {message}
        <div >
          <h1> </h1>
       </div>
       <div >
         <p style={{color: 'green'}}> .</p>
       </div>
       </div >
   </div>
 );
};

export default App;
