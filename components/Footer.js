export default function Footer() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} <a className='subtle-link highlighting' href='mailto:archie@greenalysis.org'>AM</a>, <a className='subtle-link highlighting' href='mailto:fernando@greenalysis.org'>FA</a>, <a className='subtle-link highlighting' href='mailto:ally@greenalysis.org'>AD</a>, <a className='subtle-link highlighting' href='mailto:benedikt@greenalysis.org'>BS</a></p>
      </footer>
    );
};