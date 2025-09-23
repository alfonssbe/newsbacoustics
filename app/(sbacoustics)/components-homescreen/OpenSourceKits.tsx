import * as React from 'react';

const OpenSourceKits: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full object-cover bg-white">
      <div className="relative w-full h-screen">
        <h2 className='sr-only'>Open Source Kits by SB Acoustics</h2>
        <img src={`/images/sbacoustics/opensourcekits.webp`} alt={"SB Acoustics Open Source Kits"} className='w-full h-full object-cover' />
      </div>
    </div>
  );
}

export default OpenSourceKits;