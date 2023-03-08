import React from "react";

export default function Heading({ heading, description }) {
  return (
    <div className="max-w-screen-2xl py-12 mx-auto w-11/12 lg:w-2/3 flex flex-col items-start">
      <h1 className="text-6xl font-bold text-gray-800">{heading}</h1>
      <p className="text-xl text-gray-800 my-4">{description}</p>
    </div>
  );
}
