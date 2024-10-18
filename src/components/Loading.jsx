import React from 'react';
import loader from "/Loader.mp4";
function Loading(){
    return (
        <div className='w-screen h-screen flex justify-center items-center bg-black'>
            <video className='h-1/2 w-1/2' autoPlay loop muted  src={loader} ></video>
        </div>
    )
}
export default Loading;
