import Link from 'next/link';
import { useEffect, useState } from 'react';
import {AiOutlineSearch,AiOutlineBell} from 'react-icons/ai';
import useAuth from '../hooks/useAuth';


function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const {logout} = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className="space-x-2 items-center md:space-x-10 flex">
            <Link href='/'  >
            <img
            src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
            width={150}
            height={150}
            className="cursor-pointer px-3 object-contain"
            /> 
            </Link>
            <ul className="space-x-4 hidden md:flex">
                <li className="headerLink">Home</li>
                <li className="headerLink">TV Shows</li>
                <li className="headerLink">Movies</li>
                <li className="headerLink">New & Popular</li>
                <li className="headerLink">My List</li>
            </ul>
        </div>
        <div className='items-center space-x-4 text-sm flex'>
            <AiOutlineSearch className='hidden sm:inline h-6 w-6' />
            <p className='hidden lg:inline'>Kids</p>
            <AiOutlineBell className='h-6 w-6' />
            {/* <Link href='/account' > */}
            <img
                src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
                alt="/"
                className="cursor-pointer rounded"
                onClick={logout}
            />
            {/* </Link> */}
        </div>
    </header>
  )
}

export default Header
