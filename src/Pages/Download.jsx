import React from 'react';
import DownloadButton from '../Components/DownloadButton';

const DownloadPage = () => { // Rename to avoid confusion with route path
  return (
    <div>
      <h1>Download JSON File</h1>
      <DownloadButton />
    </div>
  );
};

export default DownloadPage; // Ensure correct export