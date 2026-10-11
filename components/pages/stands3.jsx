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
                  <img src="/images/recreated/products/stands/s-stand7.png" alt="Harison International" />
                  <div className="tag">BB-254</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/s-stand7.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand</h3>
                  <p>
                    Size : 20", 24", 26", 27"  WHL
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/stands/s-stand8.png" alt="Harison International" />
                  <div className="tag">BB-255</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/s-stand7.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand Folded</h3>
                  <p>
                    Size : 20T, 24T, 26T, 27T, 29T
                  </p>
                </div>					
              </div>
            </div>
            <div className="col-sm-6 portfolio-static-item">
              <div className="grid">
                <figure className="effect-oscar">
                  <img src="/images/recreated/products/stands/s-stand9.png" alt="Harison International" />
                  <div className="tag">BB-256</div>
                  <figcaption>
                    <Link className="view icon-pentagon" aria-label="Enlarge product image" data-rel="prettyPhoto" href="/images/recreated/products/stands/s-stand7.png"><i className="fa fa-search" /></Link>							</figcaption>			
                </figure>
                <div className="portfolio-static-desc">
                  <h3>Side Stand Folded with Reflector</h3>
                  <p>
                    Size : 20T, 24T, 26T, 27T, 29T
                  </p>
                </div>					
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="paging">
            <ul className="pagination">
              <li><Link href="/stands2"><i className="fa fa-angle-left" /></Link></li>
              <li><Link href="/stands">1</Link></li>
              <li><Link href="/stands2">2</Link></li>
              <li className="active"><Link href="#">3</Link></li>
              <li><Link href="#"><i className="fa fa-angle-right" /></Link></li>
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
