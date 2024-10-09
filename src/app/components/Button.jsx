"use client"
import React from 'react';
import Link from 'next/link';

const Button = ({ text, href, onClick,type }) => {
    
  const buttonStyles =
    'px-24 py-4 rounded-3xl font-sans bg-[#FB3] text-sm font-bold dm-sans focus:outline-none';

  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
     {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonStyles}>
      {text}
    </button>
  );
};

export default Button;
