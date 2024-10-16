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
    "http://192.168.1.114:1000/api/upload-image", formData,
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
    const result = await axios.get("http://192.168.1.114:1000/api/get-image");
    console.log(result);
    setAllImage(result.data.data);
  }
    
  return (
    <div className='container'>
      <div className='grid'>
        <h1 className="text-3xl text-center">Mongo File Uploads</h1>
        <form className="m-5 p-6 border border-gray-300 rounded-lg shadow-lg bg-white" onSubmit={submitImage} encType="multipart/form-data">
            <label htmlFor="file" className="block text-lg font-semibold mb-2 text-gray-700">Upload Image</label>
            <input type="file" name="file" id="file" className="block w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" onChange={onInputChange} />
            <input type="submit" value="Submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 text-xl py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer"/>
        </form>

        <div className='grid grid-cols-1 m-4 sm:grid-cols-2 2xl:grid-cols-3'>
        {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <img className="w-full h-auto p-5 max-w-[600px] mx-auto lg:max-w-[800px] border border-gray-300 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105" src={require(`/backend/uploads/${data.image}`)} alt="img"/>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Upload;
