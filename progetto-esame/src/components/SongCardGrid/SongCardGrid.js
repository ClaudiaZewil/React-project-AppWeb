import React from "react";
import SongCard from "../SongCard/SongCard";

function SongCardGrid(props) {
    const {songList, col} = props;

    const songCardsCol = songList.map((song) => {
        return (
            <div key={song.position} className="col">
                <SongCard
                    songNumber={song.position}
                    songName={song.songTitle}
                    songArtist={song.artistTitle}
                />
            </div>
        )
    });

    return (
        <div className={`row 
                row-cols-${col.xs}
                row-cols-sm-${col.sm}
                row-cols-md-${col.md}
                row-cols-lg-${col.lg}
                row-cols-xl-${col.xl}
        `}>
            {songCardsCol}
        </div>
    )
}

export default SongCardGrid;