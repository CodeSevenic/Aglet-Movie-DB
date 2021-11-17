import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div
      className="footer_wrapper"
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
      }}
    >
      <p>
        {' '}
        Developed By{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://codesevenic-portfolio.web.app/"
        >
          Code{'{}'}Sevenic
        </a>{' '}
      </p>
    </div>
  );
}

export default Footer;
