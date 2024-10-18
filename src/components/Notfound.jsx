import react from 'react';
import notfound from "/404.gif";
function Notfound(){
    return <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img className='w-[50vh] h-[50vh]' src={notfound} alt="" />
    </div>
}
export default Notfound;