import React from "react";

const Loader = ({ loading, message }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-sm w-full text-center animate-fadeIn">
        <img src="/downloading_16313604.gif" alt="Loading..." className="w-28 h-28 mx-auto" />
        <p className="mt-4 text-gray-900 text-lg font-semibold">
          {message || "Processing..."}
        </p>
      </div>
    </div>
  );
};

export default Loader;
