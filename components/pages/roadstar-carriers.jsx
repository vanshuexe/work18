import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Roadstar Carriers</h2><ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li><Link href="/bicycle-parts"> Bicycle Parts</Link></li>
          <li><Link href="/carriers"> Carrier</Link></li>
          <li>Roadstar Carriers</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container" className="portfolio-static">
    <div className="container">
      <div className="row">   
        <div className="col-sm-9">
          <div className="row text-center">
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/roadstar-carrier/channel-patti.png" alt="Harison International" />
                  <div className="tag">BB-112</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/channel-patti.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Channel 3Patti/4Patti</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 20" / 22"  WHL                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6  portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/roadstar-carrier/french.png" alt="Harison International" />
                  <div className="tag">BB-113</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/french.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>French</h3>
                  <p>
                    Finish : Blue P/Coated<br /><br />
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/roadstar-carrier/slr-hansa.png" alt="Harison International" />
                  <div className="tag">BB-119</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/slr-hansa.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>SLR (Hansa)</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 14" / 16" / 20"  Frame                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/roadstar-carrier/slr-japnese.png" alt="Harison International" />
                  <div className="tag">BB-148</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/slr-japnese.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>SLR Japnese Type (With Reflector) </h3>
                  <p>
                    Finish : BCP/Black P/Coated<br />
                    Size : 16" / 20"                          </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/roadstar-carrier/uganda.png" alt="Harison International" />
                  <div className="tag">BB-107</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/roadstar-carrier/uganda.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Uganda</h3>
                  <p>
                    Finish : Black P/Coated<br />
                    Size : 22" Frame<br />
                    Weight : As per req.                          </p>
                </div>					
              </div>
            </div>
          </div>
          <br />
          <br />
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
