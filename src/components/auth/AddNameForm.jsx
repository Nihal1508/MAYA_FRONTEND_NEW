import React from 'react'

function AddNameForm() {
    return (
        <div className="absolute left-0 right-0 mx-auto backdrop-blur-sm bg-[#ffffff11] p-16 rounded-3xl shadow-lg flex flex-col items-start w-fit">
            <h2 className="text-2xl font-bold mb-2">Add Your name</h2>
            <p className="text-gray-400 mb-6 text-sm">
                What should we call you
            </p>

            <form className='text-left w-full flex flex-col gap-4'>
                {/* Name Field */}
                <input
                    type="name"
                    className="w-72 p-3 rounded bg-[#00000010] border  text-white"
                    placeholder="Name"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-bold rounded hover:bg-gray-200"
                >
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddNameForm
