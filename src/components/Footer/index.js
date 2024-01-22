import React from "react"
import StyledWrapper from './StyledWrapper';

const Footer = () => {
  return (
    <StyledWrapper>
      <footer className="py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          Licensed under <a href="https://github.com/brulang/bru-lang/blob/main/license.md" target="_blank" rel="noreferrer" className="link ml-2">MIT</a>
        </div>
      </footer>
    </StyledWrapper>
  );

}

export default Footer;
