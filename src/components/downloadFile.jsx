import React from 'react';
import { Link } from 'react-router-dom';

function DownloadButtons() {
  return (
    <div>
      <h1>Download PDF Files</h1>
      
      {/* Button for the first PDF */}
      <Link href="/document1.pdf" download="Descriptive-Filename-1.pdf">
        <button>Download PDF 1</button>
      </Link>

      <br /><br />

      {/* Button for the second PDF */}
      <Link href="/document2.pdf" download="Descriptive-Filename-2.pdf">
        <button>Download PDF 2</button>
      </Link>
    </div>
  );
}

export default DownloadButtons;
