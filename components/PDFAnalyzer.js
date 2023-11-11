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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedFile) {
            console.log('File ready for upload: ', selectedFile);
            // You can handle the file upload process here
        }
    };

    return (
        <div className='pdf-analysis-container'>
            <form onSubmit={handleSubmit}>
                <div>
                    <button 
                        type="button" 
                        className='choose-file-button'
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
                <br/>
                {selectedFile && <button type="submit">Upload PDF</button>}
            </form>
            {selectedFile && <p>File ready for upload: {selectedFile.name}</p>}
        </div>
    );
}
