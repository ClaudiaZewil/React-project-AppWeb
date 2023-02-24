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
                <th>#</th>
                <th>Cover</th>
                <th>Song</th>
                <th>Artist</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
                {songTr}
            </tbody>
        </table>
    )
}

export default SongTable;