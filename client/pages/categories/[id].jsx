import React, { useContext, useEffect, useState } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { FaEthereum } from "react-icons/fa";
import LatestNft from "../../components/LatestNft";

export default function Details() {
  const { isLoading, allItems, currentAccount, buyItem } =
    useContext(MyPlaceContext);
  const router = useRouter();
  const currentId = router.query.id;
  return (
    <>
      <Head>
        <title>MyPlace - Details</title>
      </Head>
      {currentAccount ? (
        <div>
          {" "}
          <section className="max-w-screen-2xl mx-auto py-12">
            {isLoading ? (
              <div className="w-full h-screen flex items-center justify-center">
                <HashLoader color="#2193b0" />
              </div>
            ) : (
              <div className="">
                {allItems.map((item) => {
                  let {
                    price,
                    category,
                    itemId,
                    owner,
                    seller,
                    name,
                    image,
                    description,
                    nftContract,
                    sold,
                  } = item;

                  if (itemId == currentId) {
                    return (
                      <div
                        key={itemId}
                        className="flex flex-col items-start justify-between"
                      >
                        <div className="w-full flex flex-col items-start justify-between md:flex-row">
                          {" "}
                          <div className="w-full md:w-1/2 lg:w-1/3 p-6 h-full">
                            <Image
                              src={image}
                              width={100}
                              height={100}
                              className="w-full h-full rounded-xl"
                            />
                          </div>
                          <div className="w-full md:w-1/2 lg:w-2/3 p-6 h-full flex flex-col  lg:items-start">
                            <h1 className="font-bold text-4xl text-gray-800">
                              {name}
                            </h1>
                            <div>
                              {currentAccount == owner ? (
                                <div></div>
                              ) : (
                                <p className="my-2">
                                  <span className="italic">seller</span>{" "}
                                  <span className="text-blue-600 font-semibold mx-2">
                                    {" "}
                                    {seller.slice(0, 10)}....
                                    {seller.slice(30, 42)}
                                  </span>
                                </p>
                              )}

                              <p className="my-2 flex">
                                <span className="italic">price</span>{" "}
                                <span className="font-semibold mx-2 flex ">
                                  <FaEthereum className="mt-1 mr-1" />
                                  {price}
                                </span>
                              </p>
                              <p className="my-2 flex">
                                <span className="italic">Item-Id</span>
                                <span className="mx-2">{itemId}</span>
                              </p>
                              <p className="text-gray-500 font-semibold py-4 mt-2">
                                <span> {description}</span>
                              </p>
                              <p className="text-gray-800 font-semibold py-4">
                                <span> {category.toUpperCase()}</span>
                              </p>
                            </div>
                            {currentAccount == owner ||
                            currentAccount == seller ? (
                              <div></div>
                            ) : sold == true ? (
                              <div></div>
                            ) : (
                              <div
                                className="btn-primary text-center lg:w-1/4 mt-12 lg:mt-24"
                                onClick={() =>
                                  buyItem(itemId, nftContract, price)
                                }
                              >
                                Buy
                              </div>
                            )}
                          </div>
                        </div>
                        <h1 className="text-3xl px-4 font-bold text-center mt-16 -mb-16 ml-6 text-gray-800">
                          See More
                        </h1>
                        <LatestNft />
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          Please Connect Wallet First
        </div>
      )}
    </>
  );
}
