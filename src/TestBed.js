import logo from './logo.svg';
import './TestBed.css';
import AudioNode from './AudioNode';
import {Howl, Howler} from 'howler';
import React from 'react';
import { Synth } from './audiosynth.js';

function playAll(){
	let time = document.getElementById('speedRange').value;
	for(let i=1; i<10; ++i){
		let note = document.getElementById("note-an"+i).value;
		let timbre = document.getElementById("timbre-an"+i).value;
		setTimeout(
			() => { 
				let col = (i-1) % 3;
				let side = 0;
				if(col == 0){
					side = -1;
				}
				if(col == 2){
					side = 1;
				}
				let sound = Synth.generate(timbre, note.charAt(0), note.charAt(1), 2);
				let h = new Howl({
					src: sound,
					stereo: side,
					format: 'wav',
				});
				h.play();
			}, i*time);
	}
}

function TestBed(props) {
	let [speed, setSpeed ] = React.useState(250);
	function handleChange(event) {
		let newValue = event.target.value;
		setSpeed(newValue);
		let speedLabel = document.getElementById("speedLabel");
		speedLabel.innerHTML = "Speed: " + newValue + "ms";
	};
	return (
		<div className="TestBed container">
		<div className="row">
		<div className="col">
		<AudioNode id='an1'/>
		</div>
		<div className="col">
		<AudioNode id='an2'/>
		</div>
		<div className="col">
		<AudioNode id='an3'/>
		</div>
		</div>
		<div className="row">
		<div className="col">
		<AudioNode id='an4'/>
		</div>
		<div className="col">
		<AudioNode id='an5'/>
		</div>
		<div className="col">
		<AudioNode id='an6'/>
		</div>
		</div>
		<div className="row">
		<div className="col">
		<AudioNode id='an7'/>
		</div>
		<div className="col">
		<AudioNode id='an8'/>
		</div>
		<div className="col">
		<AudioNode id='an9'/>
		</div>
		</div>
		<div className="row">
		<div className="col">
		<button onClick={playAll}>Play All</button>
		</div>
		<div className="col">
		<label id="speedLabel" htmlFor="range">Speed: 250ms</label>
		<input name="range" type="range" onChange={handleChange} className="form-range" id="speedRange" min="0" max="2000" value={speed} />	
		</div>
		</div>
		</div>
	);
}

export default TestBed;
