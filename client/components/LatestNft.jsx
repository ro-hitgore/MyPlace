import React, { useContext, useEffect, useState } from "react";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NftCard from "./NftCard";
import { Pagination, Navigation } from "swiper";

export default function LatestNft() {
  const { isLoading, allItems, currentAccount } = useContext(MyPlaceContext);

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col items-center px-8 py-12 ">
      {" "}
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 10,
          },
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        loop={true}
        className="w-full my-8"
      >
        {allItems.slice(0, 20).map((item) => {
          let {
            price,
            category,
            itemId,
            owner,
            tokenId,
            seller,
            name,
            image,
            description,
            sold,
          } = item;
          if (
            currentAccount !== seller &&
            currentAccount !== owner &&
            sold !== true
          ) {
            return (
              <SwiperSlide key={tokenId}>
                <NftCard
                  image={image}
                  name={name}
                  price={price}
                  category={category}
                  itemId={itemId}
                  owner={owner}
                  tokenId={tokenId}
                  description={description}
                  seller={seller}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
      ;
    </div>
  );
}
