"use client"
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Categories</a></li>
              <li><a>Sale</a></li>
              <li><a>Clearence</a></li>
              <li><a>New Stock</a></li>
              <li><a>Trending</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">ECOMMERCE</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Categories</a></li>
            <li><a>Sale</a></li>
            <li><a>Clearence</a></li>
            <li><a>New Stock</a></li>
            <li><a>Trending</a></li>
          </ul>
        </div>
        <div className="navbar-end space-x-5">
          <a className="">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </a>
          <a>
            <img width="30" height="30" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1" />
          </a>
        </div>
      </div>
      <div>
        <div className='bg-gray-300 flex justify-center items-center p-2  text-[0.8rem]'>
          <p>
            {'<'} Get 10% off on business sign up {'>'}
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar