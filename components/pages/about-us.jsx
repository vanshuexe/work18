import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>About Us</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>About Us</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container">
    <div className="container">
      <div className="row">
        <div className="col-md-12 heading text-center">
          <h2 className="title2">About Our Company
            <span className="title-desc stylish">One Stop Shop For Buying Durable Bicycle Parts, Two wheeler Parts At Reasonable Rates.. </span>
          </h2>
        </div>
      </div>
      <div className="row about-wrapper-top">
        <div className="col-md-6 ts-padding about-message">
          <h3>Who We Are</h3>
          <p>
            Our company is associated with the light Engineering industries. We are engaged In manufacturing Engg. Goods since 1964.The company is founded by Late.S.Bahadur Singh Matharoo under blessings of father late S.Hari Singh Matharoo (belongs to Village Kupp near Malerkotla in Distt.Sangrur).Unit spreads in 67,500 sq. feet area In Ludhiana, the industrial hub of India. 
            <br />
            <br />
            We mfrs. Products from Wire, Tube, M.S. Round, Channels, Angles &amp; Sheet metal Components like Bicycle carriers, Stands, Side Stands, Display Racks, Side &amp; Center Stands for bikes, CNC Formed Wire products as per buyers requirements for domestic and export market. Our company is an ISO 9001:2000 Certified. <br />
            <br />
            We are one of the leading mfrs. of Bicycle Carriers, Stands &amp; Accessories under brand name Harisons &amp; Bahadur. We mfrs. more than 60 models of Carriers &amp; Stands. We supply our Products to major OEMs in India like-Hero Cycles Ltd., T.I Cycles of India (Murugappa group), Avon Cycles Ltd., Atlas Cycles &amp; other Manufacturers, Assemblers &amp; Traders of India &amp; Abroad.
          </p>
        </div>
        <div className="col-md-6 ts-padding about-img">
          <img src="/images/recreated/abt-p.png" className="img-responsive" alt="Harison International" />
        </div>
      </div>
      <div className="row about-wrapper-bottom">
        <div className="col-md-12 ts-padding about-message">
          <p>After 24 years experience in engineering industry, Harison moves towards two wheeler sector. In year 2010 we starts manufacturing side stand and Centre Stands for Motorcycles and Scooters for replacement market.</p>
          <p>
            <br />
            <br />
            We also starts manufacturing wire products like water filter stands and display racks for domestic market.</p>
        </div>
      </div>
    </div>
    <div className="prod-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="title">
              <h3>Our Product Range</h3>
              <p className="stylish" style={{fontSize: 32}}>We are engaged In Manufacturing Engineering Goods Since 1964</p>
              <div className="title-border" />
            </div>
          </div>
        </div>
        <div className="homerecent homePort">
          <div className="fullwidth">
            <div className="row">
              <div className="first col-sm-6">
                <div className="recentimage"> 
                  <Link href="/bicycle-parts" title="Bicycle Parts and Accessaries">
                    <div className="overdefult">
                      <div className="recentdescription">
                        <h3>Bicycle Parts</h3>
                        <div className="home-portfolio-categories">Carrier, Stands, Fork and Accessaries</div>
                      </div>
                    </div>
                  </Link>
                  <div className="image"> 
                    <Link href="/bicycle-parts" title="Bicycle Parts and Accessaries"> 
                      <img className="img-responsive" src="/images/recreated/product-2.png" alt="Bicycle Parts and Accessaries" /> </Link>                    </div>
                </div>
                <h4 className="text-center"> <strong>Bicycle Parts</strong></h4>
                <div className="port-meta"> </div>
              </div>
              <div className="first col-sm-6">
                <div className="recentimage"> <Link href="/two-wheeler-parts" title="Bikes Side, Centre Stand and Fotrests">
                    <div className="overdefult">
                      <div className="recentdescription">
                        <h3>Two Wheel Parts</h3>
                        <div className="home-portfolio-categories">Side Stands, Centre Stands and Footrest</div>
                      </div>
                    </div>
                  </Link>
                  <div className="image"> <Link href="/two-wheeler-parts" title="Bikes Side, Centre Stand and Fotrests"> <img className="img-responsive" src="/images/recreated/product-3.png" alt="Bikes Side, Centre Stand and Fotrests" /> </Link> </div>
                </div>
                <h4 className="text-center"> <strong>Two Wheeler Parts</strong></h4>
                <div className="port-meta"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);}
