import React, { Children } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getTodos } from '../../services/api.services';
import TodoContext from '../../services/auth.services';
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
