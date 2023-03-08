import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            MyPlace
          </span>
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
          <li>
            <Link href="/categories" className="mr-4 hover:underline md:mr-6 ">
              Categories
            </Link>
          </li>
          <li>
            <Link href="/mynft" className="mr-4 hover:underline md:mr-6">
              My NFTs
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://twitter.com/HeyitsSagar20"
              className="hover:underline"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center">
        © 2022{" "}
        <Link href="https://flowbite.com/" className="hover:underline">
          Myplace
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
