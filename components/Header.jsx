import Link from 'next/link';
export default function Header(){return (<header id="header" className="navbar-fixed-top header2" role="banner">
  <div className="top-b">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-5 col-sm-3 sm-text-center">
          <span className="brand-name">Harison Cycle Industries</span>
        </div>
        <div className="col-lg-4 col-md-5 col-sm-9 text-center">
          <ul className="inf-c in">
            <li>
              <i className="fas fa-envelope" />
              dsm@harison.in
            </li>
            <li>
              <i className="fas fa-phone-volume" />
              +(91) 161 5071011
            </li>
          </ul>
        </div>
        <div className="col-lg-1 col-md-2 col-sm-9 text-right">
          <div className="social-icons text-center">
            <Link className="text-dark" href="https://www.facebook.com/harisoninternational" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square text-dark" />
            </Link>
            <Link href="https://www.instagram.com/harisoninternational" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram text-dark" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      {/* Logo start */}
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <div className="navbar-brand">
          <Link href="/">
            <img className="img-responsive company-logo" src="/images/brand/harison-cycle-industries.jpeg" width={836} height={926} alt="Harison Cycle Industries" />
          </Link>
        </div>
      </div>
      {/*/ Logo end */}
      <nav className="collapse navbar-collapse clearfix" role="navigation">
        <ul className="nav navbar-nav navbar-right">
          <li><Link href="/">Home</Link></li>
          {/* <li><Link href="about-us.php" class="" >About Us </Link></li> */}
          <li className="dropdown">
            <Link href="#" className="dropdown-toggle" data-toggle="dropdown">
              About Us
              <i className="fa fa-angle-down" />
            </Link>
            <ul className="dropdown-menu multi-level">
              <li><Link href="/about-us">Company Profile</Link></li>
              <li><Link href="/news-events">News &amp; Events</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <Link href="#" className="dropdown-toggle" data-toggle="dropdown">
              Products
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="dropdown-menu multi-level">
              <li className="dropdown-submenu">
                <Link href="/bicycle-parts" tabIndex={-1}>Bicycle Parts</Link>
                <ul className="dropdown-menu">
                  <li><Link href="/carriers">Carrier</Link></li>
                  <li><Link href="/stands">Side/Center Stands</Link></li>
                  <li><Link href="/frame">Frame</Link></li>
                  <li><Link href="/forks">Forks</Link></li>
                  <li><Link href="/accessories">Accessories</Link></li>
                </ul>
              </li>
              <li className="dropdown-submenu">
                <Link href="/two-wheeler-parts">Two Wheeler Parts</Link>
                <ul className="dropdown-menu">
                  <li><Link href="/side-stands">Side Stand</Link></li>
                  <li><Link href="/center-stands">Center Stand</Link></li>
                  <li><Link href="/side-hooks">Side Hooks</Link></li>
                  <li><Link href="/footrest">Footrest</Link></li>
                </ul>
              </li>
              <li><Link href="/cargo-bike-parts">Cargo Bike Parts</Link></li>
              <li><Link href="/kick-scooty-parts">Kick Scooty Parts</Link></li>
            </ul>
          </li>
          <li><Link href="/infrastructure">Infrastructure</Link></li>
          <li><Link href="/quality">Quality</Link></li>
          <li><Link href="/contact-us">Contact Us</Link></li>
          <li><Link className="qut-btn" href="/enquiry">Request a Quote</Link></li>
        </ul>
      </nav>
      {/*/ Navigation end */}
    </div>
    {/*/ Row end */}
  </div>
  {/*/ Container end */}
</header>
);}
