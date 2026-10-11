import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Two Wheeler Parts</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>Two Wheeler Parts</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container" className="portfolio-static">
    <div className="container">
      <div className="row text-center">
        <div className="col-sm-3  portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/autopart/side-stand/side-stand-1.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/side-stands"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-stand/side-stand-1.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Side Stands</h3>
              <span><Link href="/side-stands">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/autopart/center-stand/center-stand-1.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/center-stands"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/center-stand/center-stand-1.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Center Stands</h3>
              <span><Link href="/center-stands">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/autopart/side-hook/side-hook1.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/side-hooks"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-hook/side-hook1.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Side Hooks</h3>
              <span><Link href="/side-hooks">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/products/footrest1.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/footrest"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/footrest1.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Footrests</h3>
              <span><Link href="/footrest">View Product</Link></span>						</div>					
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);}
