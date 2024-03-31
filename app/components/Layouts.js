'use client';
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from "react-helmet";

import Header from './Header';
import Footer from './Footer';

const Layouts = ({ children }) => {
  const GlobalStyles = createGlobalStyle`
    body {
      background-color: #eee;
      padding: 0;
      margin: 0;
      font-family: 'Poppins', sans-serif;
    }
  `;

  return (
    <>

      <Header />

      {children}
      <Footer />
    </>
  );
};

export default Layouts;
