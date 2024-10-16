import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState();


  useEffect(()=>{
    getImage();
  },[]);

  const submitImage=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
// eslint-disable-next-line
  const result = await axios.post(
    "http://localhost:1000/api/upload-image", formData,
    {
    headers: {"Content-Type": "multipart/form-data"},
    }
    );
  }
  const onInputChange=(e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }
  
  const getImage=async()=>{
    const result = await axios.get("http://localhost:1000/api/get-image");
    console.log(result);
    setAllImage(result.data.data);
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
        {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <img className='h-[600px] w-auto p-11' src={require(`/backend/uploads/${data.image}`)} alt='img'/>
            );
          })}
      </div>
    </div>
  );
}

export default Upload;
