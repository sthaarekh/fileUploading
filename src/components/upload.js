import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Upload = () => {
  const [file, setFile] = useState();
  const [allFile, setAllFile] = useState();
  useEffect(()=>{
    getFile();
  },[]);

  const submitFile=async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file",file);

  // eslint-disable-next-line
  const result = await axios.post(
    "http://192.168.1.120:1000/api/upload", formData,
    {
    headers: {"Content-Type": "multipart/form-data"},
    }
    );
    getFile();
  }
  const onInputChange=(e)=>{
    setFile(e.target.files[0]);
  }
  
  const getFile=async()=>{
    const result = await axios.get("http://192.168.1.120:1000/api/get");
    setAllFile(result.data.data);
  }
  const handleOnClick = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
        try {
            const response = await axios.delete(`http://192.168.1.120:1000/api/delete/${id}`);
            console.log(response.data); // Handle success message
            getFile(); // Refresh file list or perform any required actions after deletion
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
        <h1 className="text-2xl font-samarkan text-center">sthaarekh</h1>
        <form className="m-5 p-6 border border-gray-300 rounded-lg shadow-lg bg-white" onSubmit={submitFile} encType="multipart/form-data">
            <label htmlFor="file" className="block text-lg font-semibold mb-2 text-gray-700">Upload Files</label>
            <input type="file" name="file" id="file" className="block w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent" onChange={onInputChange} />
            <button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 text-xl py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer"><i class="ri-upload-2-line"></i> </button>
        </form>

        <div className='grid grid-cols-1 space-x-1 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4:space-x-3'>
        {allFile == null
        ? ""
        : allFile.map((data) => {
            return(
              <div>
              <img className="w-full h-auto p-5 max-w-[600px] mx-auto lg:max-w-[800px] border border-gray-300 rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105" src={require(`/backend/uploads/${data.file}`)} alt="No Img"/>
              <div className="grid grid-cols-2 space-x-0.5">
              <button onClick={() => handleOnClick(data._id)} className="w-full bg-red-500 text-white hover:bg-red-600 text-xl py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer"><i className="ri-delete-bin-2-line"></i></button>
                <a href={require(`/backend/uploads/${data.file}`)} download className='w-full bg-green-500 text-white hover:bg-green-600 text-xl text-center py-2 rounded-lg transition duration-200 ease-in-out cursor-pointer'><i class="ri-download-2-line"></i></a>
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
