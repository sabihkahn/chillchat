import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'; // Optional: Install lucide-react or use strings

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className='w-full bg-white sticky top-0 z-50 border-b'>
      {/* DESKTOP NAV (Hidden on mobile, flex on sm and up) */}
      <div className='hidden sm:flex w-full h-20 justify-between items-center p-7'>
        <section className="font-bold text-2xl">Life Rumors</section>

        <section className='flex gap-4'>
          <Link className='font-light text-lg font-mono hover:bg-black hover:text-white rounded-2xl p-2 transition-all' to="/about">about</Link>
          <Link className='font-light text-lg font-mono hover:bg-black hover:text-white rounded-2xl p-2 transition-all' to="/contactus">contactus</Link>
          <Link className='font-light text-lg font-mono hover:bg-black hover:text-white rounded-2xl p-2 transition-all' to="/privacypolicy">privacy_policy</Link>
        </section>

        <section className='flex flex-row gap-3'>
          <button className='px-8 h-10 text-black font-mono border-2 rounded-xl hover:bg-black hover:text-white transition-all'  onClick={()=>{navigate('/login')}}>Login</button>
          <button className='px-8 h-10 text-white font-mono bg-green-500 border-2 border-green-500 rounded-xl hover:bg-black hover:border-black transition-all'  onClick={()=>{navigate('/register')}}>Register</button>
        </section>
      </div>

      {/* MOBILE NAV (Visible on mobile, hidden on sm and up) */}
      <div className='sm:hidden flex justify-between items-center p-5'>
        <section className="font-bold text-xl">Logo1</section>
        
        {/* Hamburger Icon */}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className='sm:hidden bg-white w-full flex flex-col items-center gap-4 pb-8 transition-all'>
          <Link onClick={() => setIsOpen(false)} className='text-xl py-2' to="/about">About</Link>
          <Link onClick={() => setIsOpen(false)} className='text-xl py-2' to="/contactus">Contact Us</Link>
          <Link onClick={() => setIsOpen(false)} className='text-xl py-2' to="/privacypolicy">Privacy Policy</Link>
          <hr className="w-4/5 border-gray-200" />
          <button className='w-4/5 py-3 border-2 rounded-xl' onClick={()=>{navigate('/login')}}>Login</button>
          <button className='w-4/5 py-3 bg-green-500 text-white rounded-xl'  onClick={()=>{navigate('/register')}}>Register</button>
        </div>
      )}
    </nav>
  )
}

export default Header