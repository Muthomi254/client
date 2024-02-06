import React from 'react';

const Footer = () => {
  // Define the theme color
  const themeColor = 'bg-blue-200';

  return (
    <footer className={`${themeColor} p-4 mt-8`}>
      <div className="container mx-auto text-gray text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Website Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
