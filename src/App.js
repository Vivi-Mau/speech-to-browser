import React, { Component, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const App = () => {
 const [message, setMessage] = useState('');
 
 const {
   transcript,
   interimTranscript,
   finalTranscript,
   resetTranscript,
   listening,
 } = useSpeechRecognition();

  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
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

 listenContinuously()


 return (
   <div>
     <div>
       <span style={{ color: 'red' }}>
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
     </div>

       <h1 style={{ color: 'red' }}> {transcript}</h1>

   </div>
 );
};

export default App;
