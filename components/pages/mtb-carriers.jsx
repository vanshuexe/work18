import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>MTB Carriers</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li><Link href="/bicycle-parts"> Bicycle Parts</Link></li>
          <li><Link href="/carriers"> Carrier</Link></li>
          <li>MTB Carriers</li>
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
                  <img src="/images/recreated/products/mtb/akash-buzz.png" alt="Harison International" />
                  <div className="tag">BB-162</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/mtb/akash-buzz.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Akash Buzz</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 24"  WHL                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/mtb/alton.png" alt="Harison International" />
                  <div className="tag">BB-142</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/mtb/alton.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Alton</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 26"  WHL                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/mtb/bsa-diana.png" alt="Harison International" />
                  <div className="tag">BB-102</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/mtb/bsa-diana.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>1. BSA Diana / 2. BSA MTB</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 20" / 24"/ 26"  WHL                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/mtb/bsa-lady-bird.png" alt="Harison International" />
                  <div className="tag">BB-156</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/mtb/bsa-lady-bird.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>BSA Lady Bird (EX) H.Duty</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 26"  WHL                          </p>
                </div>					
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="paging">
            <ul className="pagination">
              <li><Link href="#"><i className="fa fa-angle-left" /></Link></li>
              <li className="active"><Link href="#">1</Link></li>
              <li><Link href="/mtb-carriers2">2</Link></li>
              <li><Link href="/mtb-carriers3">3</Link></li>
              <li><Link href="/mtb-carriers2"><i className="fa fa-angle-right" /></Link></li>
            </ul>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="prd-br">
            <h3> Bicycle Parts</h3>
            <ul>
              <li><Link href="/carriers">Carriers</Link></li>
              <li><Link href="/stands">Side/Center Stands</Link></li>
              <li><Link href="/frame">Frame</Link></li>
              <li><Link href="/forks">Forks</Link></li>
              <li><Link href="/accessories">Accessories</Link></li>
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
