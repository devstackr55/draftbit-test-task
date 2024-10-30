import React from "react";

const MobileScreen = () => {
  return (
    <div className="flex justify-center items-center h-2/3 bg-gray-100 shadow-2xl">
      <div className="bg-white rounded-lg shadow-lg w-80 h-full p-4">
        <input
          type="text"
          placeholder="Enter something..."
          className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        />

        <button className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-600 transition duration-200">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MobileScreen;
