'use client'

import Animated from './animated/Animated';

import { useState, useRef } from 'react';

export default function PDFAnalyzer() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleUploadClick = async () => {
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });
        try {
            const response = await fetch('/api/openai/greenalyze', {
                method: 'POST',
                body: formData,
            });
            console.log(await response.json());
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const GreenalyzeButton = () => {
        return (
            <button
                type="button"
                className={`upload-button ${selectedFiles.length ? 'highlighted-background' : ''}`}
                onClick={handleUploadClick}
                disabled={!selectedFiles.length}
            >
                ⬆️&nbsp;&nbsp;Greenalyze
            </button>
        )
    }
 
    return (
        <div className='pdf-analysis-container'>
            <button 
                type="button" 
                className={`choose-file-button`}
                onClick={handleButtonClick}
            >
                Select PDFs
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
                <>
                    <p className='under-text'>{selectedFiles.map(file => file.name).join(', ')}</p>
                    <Animated WrappedComponent={GreenalyzeButton} />
                </>
                ||
                <p className='under-text'>ⓘ Upload ESG or financial report(s) of the company you would like to <b className='highlighted'>greenalyze</b></p>
            }
        </div>
    );
}
