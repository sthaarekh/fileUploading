import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [image, setImage] = useState();
  const [allImage, setAllImage] = useState();
  // const [data, setData] = useState();


  useEffect(()=>{
    getImage();
  },[]);

  const submitImage=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image);
// eslint-disable-next-line
  const result = await axios.post(
    "http://192.168.1.114:1000/api/upload", formData,
    {
    headers: {"Content-Type": "multipart/form-data"},
    }
    );
    getImage();
  }
  const onInputChange=(e)=>{
    setImage(e.target.files[0]);
  }
  
  const getImage=async()=>{
    const result = await axios.get("http://192.168.1.114:1000/api/get");
    setAllImage(result.data.data);
  }
  const handleOnClick = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
        try {
            const response = await axios.delete(`http://192.168.1.114:1000/api/delete/${id}`);
            console.log(response.data); // Handle success message
            getImage(); // Refresh image list or perform any required actions after deletion
        } catch (error) {
            console.error("There was an error deleting the item!", error);
        }
    } else {
        console.log("Deletion canceled.");
    }
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

        <div className='grid grid-cols-1 space-x-1 sm:grid-cols-2 2xl:grid-cols-3'>
        {allImage == null
        ? ""
        : allImage.map((data) => {
            return(
              <div>
              <img className="w-full h-auto p-5 max-w-[600px] mx-auto lg:max-w-[800px] border border-gray-300 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105" src={require(`/backend/uploads/${data.image}`)} alt="img"/>
              <div className="grid grid-cols-2 space-x-0.5">
              <button onClick={() => handleOnClick(data._id)} className="w-full bg-red-500 text-white hover:bg-red-600 text-xl py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer"><i className="ri-delete-bin-2-line"></i></button>
                <a href={require(`/backend/uploads/${data.image}`)} download className='w-full bg-green-500 text-white hover:bg-green-600 text-xl text-center py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer'><i class="ri-download-2-line"></i></a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Upload;
