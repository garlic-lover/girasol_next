import React, { useState } from "react";
import styled from "styled-components";

export default function () {
  const [recorder, recorderChange] = useState(null);
  const [isRecording, isRecordingChange] = useState(false);

  let chunks = [];

  navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      recorderChange(mediaRecorder);
      mediaRecorder.ondataavailable = function (e) {
        console.log(e);
        chunks.push(e.data);
      };
      mediaRecorder.onstop = function (e) {
        console.log("recorder stopped");

        const clipContainer = document.createElement("article");
        const clipLabel = document.createElement("p");
        const audio = document.createElement("audio");
        const deleteButton = document.createElement("button");

        clipContainer.classList.add("clip");
        audio.setAttribute("controls", "");
        deleteButton.innerHTML = "Delete";
        clipLabel.innerHTML = "name";

        clipContainer.appendChild(audio);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(deleteButton);
        console.log(clipContainer);

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;

        deleteButton.onclick = function (e) {
          let evtTgt = e.target;
          evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        };
      };
    });

  return (
    <AudioAdd>
      <h4>Let's add audio</h4>
      <PlayWrapper isRecording={isRecording}>
        <span
          role="img"
          aria-label="start-recording"
          onClick={() => {
            if (isRecording) {
              recorder.stop();
            } else {
              recorder.start();
            }
            console.log(recorder.state, chunks);
            isRecordingChange(!isRecording);
          }}
        >
          {isRecording ? "►" : "🎤"}
        </span>
        <audio />
      </PlayWrapper>
      <input type="file" accept="audio/*" capture="microphone" />
    </AudioAdd>
  );
}

const AudioAdd = styled.div``;

const PlayWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color4};
  display: flex;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translateY(1px);
  }
  &:active {
    transform: translateY(2px);
  }
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    background-color: ${(props) => props.isRecording && "red"};
  }
`;

/*   if (navigator.mediaDevices) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log(stream);
        audio.srcObject = stream;
        audio.onloadedmetadata = function (e) {
          audio.play();
          audio.muted = true;
        };

        // Create a MediaStreamAudioSourceNode
        // Feed the HTMLMediaElement into it
        var audioCtx = new AudioContext();
        var source = audioCtx.createMediaStreamSource(stream);

        // Create a biquadfilter
        var biquadFilter = audioCtx.createBiquadFilter();
        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.value = 1000;
        biquadFilter.gain.value = range.value;

        // connect the AudioBufferSourceNode to the gainNode
        // and the gainNode to the destination, so we can play the
        // music and adjust the volume using the mouse cursor
        source.connect(biquadFilter);
        biquadFilter.connect(audioCtx.destination);

        // Get new mouse pointer coordinates when mouse is moved
        // then set new gain value

        range.oninput = function () {
          biquadFilter.gain.value = range.value;
        };
      })
      .catch(function (err) {
        console.log("The following gUM error occured: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  } */
