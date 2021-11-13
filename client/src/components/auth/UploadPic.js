import React from 'react'
import axios from 'axios'
import "./uploadPic.css";


// const uploadData = require('../configs/cloudinary-setup');



class Upload extends React.Component {

    state = {
        file: null,
        profilePicture: this.props.userPic
    }


    uploadFile = (event) => {
        this.setState({
            file: event.target.files[0]
        })
        // .then(this.saveHandler())
    }

    saveHandler = () => {
        const uploadData = new FormData();

        uploadData.append('imageUrl', this.state.file);

        axios.post('/api/upload', uploadData).then((resp) => {
            console.log(resp.data)
            alert('upload done')
        })
    }

    render() {
        console.log("this.state", this.state.file)
        return (
            <div className="upload-container">
                {/* <label for="files" className="basic-btn-small">Select Profile Picture</label> */}
                <input id='files' 
                type='file' 
                onChange={this.uploadFile}   
                // style={{display: 'none'}}
                ></input>
                <button onClick={this.saveHandler} className="basic-btn-small">Save Profile Pic</button>
            </div>
        );
    }
}

export default Upload;