import React from 'react'
import ReactLoading from 'react-loading';
const Loader = () => {
    return (
        <div className=" absolute top-[0%] flex justify-center items-center bg-[#00000098] h-[100vh] w-full">

            <ReactLoading type={'spin'} color={'#3b9ae3'} height={67} width={67} />

        </div>
    )
}

export default Loader
