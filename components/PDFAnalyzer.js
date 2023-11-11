'use client'

import React, { useState, useEffect, useRef } from 'react';

export default function PDFAnalyzer() {
    const [analyzing, setAnalyzing] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        if (!analyzing) {
            setSelectedFiles([...event.target.files]);
            setAnalyzing(true);
        }
        
        

    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // UseEffect
    useEffect(() => {
        async function uploadFiles() {
            setAnalyzing(true)
            const formData = new FormData();
            selectedFiles.forEach(file => {
                formData.append('files', file);
            });
            const response = await fetch('/api/openai', {
                method: 'POST',
                body: formData,
            });
            setAnalyzing(false)
        }
        if (!analyzing) {
            uploadFiles()
        }
    }, [selectedFiles])

    return (
        <div className='pdf-analysis-container'>
            <button 
                type="button" 
                className={`choose-file-button ${selectedFiles.length ? 'highlighted-background' : ''}`}
                onClick={handleButtonClick}
            >
                ⬆️&nbsp;&nbsp;Upload PDFs
            </button>
            <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            {
                selectedFiles.length > 0 
                && 
                <p className='under-text'>{selectedFiles.map(file => file.name).join(', ')}</p>
                ||
                <p className='under-text'>ⓘ Upload ESG or financial report(s) of the company you would like to <b className='highlighted'>greenalyse</b></p>
            }
        </div>
    );
}
