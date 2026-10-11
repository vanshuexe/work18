import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Side Stand</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li><Link href="/two-wheeler-parts"> Two Wheeler parts</Link></li>
          <li>Side Stands</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container" className="portfolio-static">
    <div className="container">
      <div className="row">   
        <div className="col-sm-9">
          <div className="row text-center">
            <div className="col-sm-6  portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/autopart/side-stand/side-stand-9.png" alt="Harison International" />
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-stand/side-stand-9.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand For Super XL</h3>
                  <p>
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/autopart/side-stand/side-stand-10.png" alt="Harison International" />
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-stand/side-stand-10.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand For Discover</h3>
                  <p>
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/autopart/side-stand/side-stand-11.png" alt="Harison International" />
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-stand/side-stand-11.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand For Scooty</h3>
                  <p>
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/autopart/side-stand/side-stand-12.png" alt="Harison International" />
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/autopart/side-stand/side-stand-12.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand For Shine</h3>
                  <p>
                  </p>
                </div>					
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="paging">
            <ul className="pagination">
              <li><Link href="/side-stands2"><i className="fa fa-angle-left" /></Link></li>
              <li><Link href="/side-stands">1</Link></li>
              <li><Link href="/side-stands2">2</Link></li>
              <li className="active"><Link href="#">3</Link></li>
              <li><Link href="/side-stands4">4</Link></li>
              <li><Link href="/side-stands4"><i className="fa fa-angle-right" /></Link></li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="prd-br">
            <h3>Two Wheeler Parts</h3>
            <ul>
              <li><Link href="/side-stands">Side Stands</Link></li>
              <li><Link href="/center-stands">Center Stands</Link></li>
              <li><Link href="/side-hooks">Side Hooks</Link></li>
              <li><Link href="/footrest">Footrest</Link></li>
            </ul><br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);}
