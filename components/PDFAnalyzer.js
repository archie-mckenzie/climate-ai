'use client'

import React, { useState, useRef } from 'react';

export default function PDFAnalyzer() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='pdf-analysis-container'>
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
            {
                selectedFile 
                && 
                <p>{selectedFile.name}</p>
                ||
                <p>ⓘ [PLACEHOLDER]</p>
            }
        </div>

    );
}
