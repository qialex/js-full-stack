// components/header.tsx
import React from 'react'
import HeaderRight from './header-right'

const Header: React.FC = () => {

  return <header >
    <section className='container is-family-primary'>
      <nav className='navbar is-transparent'>
        <div className='navbar-brand'>
          {/* <a className={'navbar-start href="/">
            <h1>Demo fullstack project</h1>
          </a> */}
          {/* <a class="navbar-item" href="https://github.com/qialex/js-full-stack">
            <h1>qialex/js-full-stack</h1>
          </a> */}

          {/* <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a> */}
        </div>
        
        <div className='navbar-menu'>
          <div className='navbar-start'>
            <a className='navbar-item pt-4 pb-4' href="/">
              Home
            </a>
            <a className='navbar-item pt-4 pb-4' href="https://github.com/qialex/js-full-stack">
              github.com/qialex/js-full-stack
            </a>              

            <a className='navbar-item pt-4 pb-4' href="https://qialex.me">
              CV / Resume website
            </a>
          </div>
        </div>

        <HeaderRight />

      </nav>
    </section>
  </header>
};

export default Header