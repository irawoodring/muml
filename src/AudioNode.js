import logo from './logo.svg';
import React, { Component } from 'react';
import './AudioNode.css';
import { Synth } from './audiosynth.js'

let noteOptions = [];
let letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G' ];
letters.forEach( note => {
	for(let i=2; i<7; ++i){
		noteOptions.push( { value: note+i, label: note+i });
	}
});

let timbreOptions = [ { "value": "0", "label":"piano"}, 
		      { "value":"1", "label":"organ"},
		      { "value":"2", "label":"acoustic"},
		      { "value":"3", "label":"edm"} ];

function Note(props){
	return (
		<div>
		<label htmlFor="noteInput">Note:</label>
		<select id={"note-"+props.id} className="noteInput">
		{noteOptions.map(({ value, label }, index) => <option key={value} value={value} >{label}</option>)}
		</select>
		</div>
	);
}

function Timbre(props){
	return (
		<div>
		<label htmlFor="timbreInput">Instrument:</label>
		<select id={"timbre-"+props.id} className="timbreInput">
		{timbreOptions.map(({ value, label }, index) => <option key={value} value={value} >{label}</option>)}
		</select>
		</div>
	);
}

class AudioNode extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="AudioNode form-group">
			<Note id={this.props.id}/>
			<br />
			<Timbre id={this.props.id}/>
			<button onClick={() => this.playSound(this.props.id) }>Play sample</button>
			</div>
		);
	}

	playSound(id){
		let selected = document.getElementById("note-"+id);
		let note = selected.value;
		selected = document.getElementById("timbre-"+id);
		let timbre = selected[selected.selectedIndex].innerHTML;
		let piano = Synth.createInstrument(timbre);
		piano.play(note.charAt(0), note.charAt(1), 2); // plays C4 for 2s using the 'piano' sound profile
	}
}

export default AudioNode;
