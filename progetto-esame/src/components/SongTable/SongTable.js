import React from "react";
import SongTableTr from "../SongTableTr/SongTableTr";

function SongTable(props) {
    const {songList, songDate} = props;

    //costruzione righe tabella
    const songTr = songList.map((song) => {
        return (
            <SongTableTr
                songNumber={song.position}
                songName={song.songTitle}
                songArtist={song.artistTitle}
            />
        )
    });

    return (
        <table className="table">
            <thead>
            <tr>
                <th><h4>Position</h4></th>
                <th><h4>Cover</h4></th>
                <th><h4>Song</h4></th>
                <th><h4>Artist</h4></th>
            </tr>
            </thead>
            <tbody>
                {songTr}
            </tbody>
        </table>
    )
}

export default SongTable;