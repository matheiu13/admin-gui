import React from 'react'
import { LeftSideBar } from "@/constants";
import Link from 'next/link';

function LeftNavbar() {
  return (
    <div className='h-[100vh] w-[inherit] fixed bg-black text-white p-5'>
        {LeftSideBar.map((link)=>(
          <Link 
             href={link.route}
             key={link.label}
             className="mx-3"
          >
            <p className="text-lg font-medium">{link.label}</p>
          </Link>
        ))}
    </div>
  )
}

export default LeftNavbar