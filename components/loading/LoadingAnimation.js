/*

Copyright (c) 2023 by Andreas Hjortland (https://codepen.io/andreas_hjortland/pen/WjJVqB)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import React from 'react';
import '../../css/loadingAnimation.css'

export default function LoadingAnimation() {
    return (
        <svg id="loading" viewBox="0 0 100 80">
        <defs>
            <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4383b8" />
                <stop offset="100%" stopColor="#4aa06c" />
            </linearGradient>
            <clipPath id="rects">
                <rect className="rect" id="rect1" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect2" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect3" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect4" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect5" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect6" x="0" y="0" width="30" height="30" rx="2" ry="2" />
                <rect className="rect" id="rect7" x="0" y="0" width="30" height="30" rx="2" ry="2" />
            </clipPath>
        </defs>
        <rect
            id="container"
            transform="translate(50) scale(0.707, 0.707) rotate(45)"
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#gradient)"
            clipPath="url(#rects)"
            ></rect>
        </svg> 
    );
}
