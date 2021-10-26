import React from 'react'
import axios from 'axios'

// const uploadData = require('../configs/cloudinary-setup');



class Upload extends React.Component {

    state = {
        file: null
    }


    uploadFile = (event) => {
        this.setState({
            file: event.target.files[0]
        })
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
        return (
            <div className="App">
                <label>Choose a profile picture: </label>
                <input type='file' onChange={this.uploadFile}></input>
                <button onClick={this.saveHandler}>Save Image</button>
            </div>
        );
    }
}

export default Upload;