import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ imgSrc, category }) {
  return (
    <Link
      href={`/categories/${category}`}
      className="flex flex-col items-center rounded-xl category-card"
    >
      <Image src={imgSrc} alt={category} className="rounded-xl" />
      <div className="overlay rounded-xl">
        <div className="content">
          <h1 className="font-xl font-semibold uppercase text-white ">
            {category}
          </h1>
        </div>
      </div>
    </Link>
  );
}
