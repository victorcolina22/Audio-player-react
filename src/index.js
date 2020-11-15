import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import 'bootstrap';

const App = () => {

    const [songIndex, setSongIndex] = useState(0)

    const urlSong = "https://assets.breatheco.de/apis/sound/";

    let myAudio = useRef(null);

    const [songs, setSong] = useState ([
        { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
        { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
        { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
    ])

    const selectedSong = (i) => {
        setSongIndex(i)
        myAudio.src = `${urlSong}${songs[i].url}`
        myAudio.play();
    }

    const playSong = () => {
        myAudio.play();
    }

    const stopSong = () => {
        myAudio.pause();
    }

    const nextSong = () => {
        if((songIndex + 1) <= songs.length - 1)
            selectedSong(songIndex + 1)
    }

    const previusSong = () => {
        if((songIndex - 1) >= 0)
            selectedSong(songIndex - 1)
    }


    return (
        <div className="container">
            <h2>Zpotifie</h2>
            <div className="card">
                <ul class="list-group list-group-flush">

                    {
                        songs.map((singleSong, index) => {
                            return <li key={index} onClick={() => selectedSong(index)} className="list-group-item">{singleSong.name}</li>
                        })
                    }

                </ul>
            </div>
            <div className="row justify-content-center">
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={previusSong} className="btn btn-outline-light mt-2 mx-1"><i className="fas fa-angle-double-left"></i></button>
                    <button type="button" onClick={playSong} className="btn btn-outline-light mt-2 mx-1"><i className="fas fa-play"></i></button>
                    <button type="button" onClick={stopSong} className="btn btn-outline-light mt-2 mx-1"><i className="fas fa-pause"></i></button>
                    <button type="button" onClick={nextSong} className="btn btn-outline-light mt-2 mx-1"><i className="fas fa-angle-double-right"></i></button>
                </div>
            </div>
            <audio ref={a => myAudio = a} src={`${urlSong}${songs[0].url}`}></audio>
        </div>
        
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)