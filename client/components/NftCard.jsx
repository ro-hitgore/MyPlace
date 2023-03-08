import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";
import { MyPlaceContext } from "../context/MyPlaceContext";

export default function NftCard({
  price,
  itemId,
  owner,
  seller,
  name,
  image,
  nftContract,
  sold,
}) {
  const { currentAccount, buyItem } = useContext(MyPlaceContext);

  return (
    <div className="max-w-sm my-4 bg-white rounded-lg drop-shadow-md md:w-10/12 lg:w-11/12 hover:scale-105  transition-all duration-100 cursor-pointer ">
      <Link href={`/categories/${itemId}`}>
        <Image
          className="rounded-t-lg w-full h-72"
          src={image}
          alt={name}
          width={200}
          height={200}
        />
      </Link>

      <div className="p-5">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
            {name.slice(0, 12) + "..."}
          </h5>
        </div>
        <p>{seller.slice(0, 5) + "..." + seller.slice(37, 42)}</p>

        <div className="flex items-center justify-between">
          <div className="flex text-md font-medium text-gray-900 items-start justify-center">
            <FaEthereum className="mt-1 mr-1" /> {price}
          </div>
          {currentAccount === seller || currentAccount === owner ? (
            <div className="btn-primary">Owned</div>
          ) : sold === true ? (
            <div className="btn-primary">Sold</div>
          ) : (
            <div
              className="btn-primary"
              onClick={() => buyItem(itemId, nftContract, price)}
            >
              Buy
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
