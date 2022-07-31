import React, { Children } from 'react';
import Title from './Title';
import '../styles/layout.css'

function Layout({ children }) {
  return (
    <div className='layout-container'>
      <Title />
      {children}
    </div>
  );
}

export default Layout;
