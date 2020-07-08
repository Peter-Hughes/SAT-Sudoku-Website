import React from "react";
import {downloadTxtFile, handleFiles} from "../../../utils/file/FileUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import ReactFileReader from 'react-file-reader';

// As default export a function that takes in props and returns a file IO section
export default props => {
    // Props passed from parent
    // downloadText - text to be downloaded
    // onChange - function to handle the change of a file being opened
    const {downloadText, onChange} = props;
    // Return a div containing a file reader and file downloader
    return <div className={"features"}>
        <ReactFileReader fileTypes={".txt"} multipleFiles={false} handleFiles={files => handleFiles(files, onChange)}>
            <FontAwesomeIcon icon={faFolderOpen}/>
        </ReactFileReader>
        <FontAwesomeIcon icon={faFileDownload} onClick={() => downloadTxtFile(downloadText, "solution")}/>
    </div>
}

