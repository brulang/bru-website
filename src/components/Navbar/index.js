import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Bruno from "components/Bruno";
import StyledWrapper from './StyledWrapper';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = () => {
    setMenuOpen(window.innerWidth >= 640 ? true : false);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledWrapper className="w-full site-navbar">
      <div>
        <header className="flex items-center justify-between py-4">
          <div>
            <Link href="/" legacyBehavior>
              <div className="flex items-center py-2 cursor-pointer" style={{marginLeft: -4}}>
                <div className="flex flex-col justify-center text-left">
                  <Bruno width={40} />
                </div>
                <div
                  className=" flex items-center font-medium"
                  style={{fontSize: 20, paddingLeft: 6, position: 'relative', top: -1}}
                >
                  bru
                </div>
              </div>
            </Link>
          </div>

          <nav className={`${menuOpen ? 'flex' : 'hidden'}`}>
            <Link href="/examples" legacyBehavior>
              <a className="mr-2 hover:text-yellow-600 transition">Examples</a>
            </Link>
            <Link href="https://bru-playground.vercel.app" legacyBehavior>
              <a className="mr-2 hover:text-yellow-600 transition">Playground</a>
            </Link>
            <Link href="https://github.com/brulang/bru-lang/blob/main/bru-spec-v1.md" legacyBehavior>
              <a className="mr-2 hover:text-yellow-600 transition">Spec</a>
            </Link>
            <Link href="https://github.com/brulang/bru-lang" legacyBehavior>
              <a className="mr-2 hover:text-yellow-600 transition">Github</a>
            </Link>
          </nav>
          <button className="toggle inline-block sm:hidden w-8 h-8 text-slate-700 p-1" onClick={menuToggle}>
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </header>
      </div>
    </StyledWrapper>
  )
};

export default Navbar;
