import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Bicycle Parts</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>Bicycle Parts</li>
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
              <img src="/images/recreated/products/roadstar-carrier/channel-patti.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/carriers"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/channel-patti.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Carrier</h3>
              <span><Link href="/carriers">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/products/stands/bb-193a.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/stands"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/bb-193a.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Side/Center Stands</h3>
              <span><Link href="/stands">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/products/frame/frame5.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/frame"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/frame/frame5.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Frames</h3>
              <span><Link href="/frame">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/products/fork/fork-mtb.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/forks"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/fork/fork-mtb.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Forks</h3>
              <span><Link href="/forks">View Product</Link></span>						</div>					
          </div>
        </div>
        <div className="col-sm-3 portfolio-static-item">
          <div className="grid">
            <figure className="effect-oscar">
              <img src="/images/recreated/products/accessories1.png" alt="Harison International" />
              <figcaption>
                <Link className="link icon-pentagon" aria-label="View product details" href="/accessories"><i className="fa fa-link" /></Link>
                <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/accessories1.png"><i className="fa fa-search" /></Link>							</figcaption>			
            </figure>
            <div className="portfolio-static-desc">
              <h3>Accessories</h3>
              <span><Link href="/accessories">View Product</Link></span>						</div>					
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);}
