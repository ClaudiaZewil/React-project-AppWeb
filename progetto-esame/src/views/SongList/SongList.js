import React, {useState} from "react";
import SongCardGrid from "../../components/SongCardGrid/SongCardGrid";
import SongTable from "../../components/SongTable/SongTable";
import clsx from 'clsx';
import SongListData from "../../assets/data/RollingStoneTop500Song.json"
import style from "./SongList.module.css";

function SongList() {
    const [displayGrid, setDisplayGrid] = useState("true");

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <div className={style.switch}>
                        <div className={clsx(style.option, {[style.active]: displayGrid})}
                             onClick={() => setDisplayGrid(true)}>
                            Grid
                        </div>
                        <div className={clsx(style.option, {[style.active]: !displayGrid})}
                             onClick={() => setDisplayGrid(false)}>
                            Table
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col">
                    {
                        displayGrid ?
                            <SongCardGrid
                                songList={SongListData}
                                col={{xs:1, sm:2, md:3, lg:4, xl:5}}
                            /> :
                            <SongTable songList={SongListData} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SongList;