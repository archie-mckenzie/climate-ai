'use client'

import React, { useState, useRef } from 'react';

export default function PDFAnalyzer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        alert('Hello')
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='pdf-analysis-container'>
            <div>
                <button 
                    type="button" 
                    className={`choose-file-button ${selectedFile ? 'highlighted-background' : ''}`}
                    onClick={handleButtonClick}
                >
                    ⬆️&nbsp;&nbsp;Upload PDF
                </button>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
            </div>
            {selectedFile && <p>{selectedFile.name}</p>}
        </div>
    );
}
