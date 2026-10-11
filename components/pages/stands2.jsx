import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Side/Center Stands</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li><Link href="/bicycle-parts"> Bicycle Parts</Link></li>
          <li>Side/Center Stands</li>
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
                  <img src="/images/recreated/products/stands/bb-193a.png" alt="Harison International" />
                  <div className="tag">BB-193/A</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/bb-193a.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Folded Side Stand with Reflector</h3>
                  <p>
                    Stand for 20/24/26/27/29T Bikes<br />
                    Finish : Black Powder Coated
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/stands/bb-209.png" alt="Harison International" />
                  <div className="tag">BB-209</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/bb-209.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Centre Stand</h3>
                  <p>
                    Stand for 20, 24, 26, 27T Bikes<br />
                    Finish : Black Powder Coated
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/stands/s-stand5.png" alt="Harison International" />
                  <div className="tag">BB-192</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/s-stand5.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Spunky (Hi-End Bikes) Side Stand</h3>
                  <p>
                    Size : 20T, 24T, 26T, 27T, 29T<br />
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/stands/s-stand6.png" alt="Harison International" />
                  <div className="tag">BB-201</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/s-stand6.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Scooter Side Stand</h3>
                  <p>
                    Size : <br />
                  </p>
                </div>					
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="paging">
            <ul className="pagination">
              <li><Link href="/stands"><i className="fa fa-angle-left" /></Link></li>
              <li><Link href="/stands">1</Link></li>
              <li className="active"><Link href="#">2</Link></li>
              <li><Link href="/stands3">3</Link></li>
              <li><Link href="/stands3"><i className="fa fa-angle-right" /></Link></li>
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
