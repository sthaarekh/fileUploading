import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState();
  const submitImage=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);

  const result = await axios.post(
    "http://localhost:1000/upload-image", formData,
    {
    headers: {"Content-Type": "multipart/form-data"},
    }
    );
  }
  const onInputChange=(e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

    
  return (
    <div className='container'>
      <div className='grid grid-cols-2 m-auto'>
        <h1 className="text-3xl text-center">Mongo File Uploads</h1>
        <form  onSubmit={submitImage} encType='multipart/form-data'>
          <input 
            type="file" 
            name="file" 
            id="file" 
            className="custom-file-input border border-solid border-gray-300 px-4 py-2 rounded"  // Add the onChange handler here
            onChange={onInputChange}/>
          <input 
            type="submit" 
            value="Submit" 
            className="text-blue-300 hover:text-blue-400 text-2xl px-4 py-2 rounded cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default Upload;
