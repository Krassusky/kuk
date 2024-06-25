import React from 'react';

const DownloadButton = () => {
  const handleDownload = () => {
    fetch('/download')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Download failed', err));
  };

  return (
    <button onClick={handleDownload}>
      Download JSON
    </button>
  );
};

export default DownloadButton;