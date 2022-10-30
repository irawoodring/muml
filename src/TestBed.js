import logo from './logo.svg';
import './TestBed.css';
import AudioNode from './AudioNode';
import {Howl, Howler} from 'howler';
import React, {useState, useEffect } from 'react';
import { Synth } from './audiosynth.js';

function playAll(){
	let direction=document.getElementsByName('playOrder');
	if(direction[0].checked){
		playClockwise();
	}
	if(direction[1].checked){
		playLtoR();
	}
}

function playClockwise(){
	let order = [ 1, 2, 3, 6, 9, 8, 7, 4 ];
	play(order);	
}

function play(order){
	let time = document.getElementById('speedRange').value;
        let count = 0;
        for(const i of order){
		console.log(i);
                if(document.getElementById("cb-an"+i).checked){
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
                                }, count*time);
                        count++;
                }
        }

}

function playLtoR(){
	let order = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
	play(order);
}
let presets = [
	[ "A4", "A4", "A4", "A3", "A3", "A3", "A2", "A2", "A2" ],
	[ "A4", "B4", "C5", "A3", "B3", "C4", "A2", "B2", "C3" ]
]
function applyPreset(event){
	let choice = document.getElementById('presetSelect').value;
	for(let i=1; i<=presets[choice].length; ++i){
		let current=document.getElementById("note-an"+i)
		current.value = presets[choice][i-1];
		current=document.getElementById("cb-an"+i);
		current.checked = true;
	}
}

function Preset(props){
	const options = [
		{ label: "One", value: "0" },
		{ label: "Two", value: "1" }
	];
	useEffect( () => applyPreset() );
	return (
		<div className="preset">
			<label htmlFor="presetSelect"><b>Preset: </b></label>
			<select name="presetSelect" id="presetSelect" onChange={applyPreset} defaultValue="0">
			{options.map((option) => (
				<option key={option.value} value={option.value}>{option.label}</option>
			))}
			</select>
		</div>
	)
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
		<label htmlFor="playOrder"><b>Play Order:</b> </label>
		<label htmlFor="cwOrder">Clockwise</label>
		<input type="radio" name="playOrder" id="cwOrder" value="Clockwise" defaultChecked></input>
		<label htmlFor="ltrOrder">Left-to-right</label>
		<input type="radio" name="playOrder" id="ltrOrder" value="Left-to-right"></input>
		</div>
		<div className="col">
			<Preset/>
		</div>
		</div>
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
