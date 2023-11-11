import Image from "next/image"
import Link from "next/link";

export default function Header() {
    return (
        <>
          <br/><br/>
          <div className="header-container">
            <div className='header-div'>
            <Link className='subtle-link' href='/'><Image className='circle-image' width={80} height={80} src='/greenalysis.png'/></Link>
            </div>
            <div className='header-div'>
              <Link className='subtle-link' href='/'><h1 className='highlighted'><b>Greenalysis</b></h1></Link>
            </div>
          </div>
        </>
    );
};