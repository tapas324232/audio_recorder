const electron = require('electron');
var fs = require('fs');
const path = require("path");
let audioStream = null;


document.querySelector('#StartAudioRecording').addEventListener('click', () => {
    StartAudioRecording()
});

document.querySelector('#StopRecording').addEventListener('click', () => {
    StopRecording()
});

document.querySelector('#Explore').addEventListener('click', () => {
    
});

function StartAudioRecording() {

    if (navigator.mediaDevices) {
        

        var constraints = { audio: true };
        var chunks = [];

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {

                mediaRecorder = new MediaRecorder(stream);

                //   visualize(stream);
                var StartAudioRecordingButton = document.getElementById('StartAudioRecording');
                StartAudioRecordingButton.style.display = "none";
                audioStream = stream;
                mediaRecorder.start();

                console.log("Recording Started");

                // console.log(window.URL)


                mediaRecorder.onstop = function (e) {
                    console.log("stop() called.");

                    StartAudioRecordingButton.style.display = "initial";
                    var blob = new Blob(chunks, { 'type': 'audio/wav' });
                    chunks = [];
                    var audioURL = URL.createObjectURL(blob);
                    
                    // const audioBlob = new Blob([blob], { type: blobType });
                    SaveFile(blob);
                    
                    // fs.exists(path.join(__dirname, "TapasAudio"), exists => {
                    //     if(exists) {
                    //         SaveFile(blob)

                    //     }else{
                    //         fs.mkdir(__dirname + "/TapasAudio", 511, function (err) {
                    //             if (err) {
                    //                 console.log("Failed to create file at " + __dirname + "/TapasAudio");
                    //             }else{
                    //                 SaveFile(blob)
                    //             }
                    //         });
                    //     }
                            
                    // });

                    console.log("recorder stopped");

                }

                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                }
            })
            .catch(function (err) {
                console.log('error: ' + err);
            })
    }else{
        console.log('Not supported.');
    }

}

function StopRecording() {
    mediaRecorder.stop();
    console.log("stopped");

}

function SaveFile(blob) {
    const extension = "wav";
    var today = new Date();
    const anchor = document.createElement("a");
    const url = window.URL.createObjectURL(blob);
    anchor.href = url;
    anchor.download = today.getTime()+`.${extension}`;
    anchor.click();
    window.URL.revokeObjectURL(url);
}