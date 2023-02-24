import React from "react";
import {NavLink} from "react-router-dom";

function SongTable(props) {
    const {songList, songDate, songImage} = props;
    //costruzione righe tabella
    const songTr = songList.map((song) => {
        return (
            <tr key={song.id}>
                <td>{song.position}</td>
                <td>
                    <img src={songImage} alt={song.songTitle} loading="lazy" />
                </td>
                <td><NavLink to={`/songList/${song.position}`}>{song.songTitle}</NavLink></td>
                <td>{song.artistTitle}</td>
                <td>{songDate}</td>
            </tr>
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