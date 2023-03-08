import React from "react";
import Image from "next/image";

export default function Banner({ img }) {
  return (
    <div className="w-screen sm:h-72 banner">
      <Image
        src={img}
        width={100}
        height={100}
        alt="banner"
        className="w-full h-full"
      />
    </div>
  );
}
