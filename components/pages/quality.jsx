import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Quality</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>Quality</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container">
    <div className="container">
      <div className="row">
        <div className="col-md-12 heading text-center">
          <h2 className="title2">Quality Control
            <span className="title-desc">Best Quality Products</span>
          </h2>
        </div>
      </div>
      <div className="row about-wrapper-top">
        <div className="col-md-6 ts-padding about-message">
          <p>
            An 9001: 2000 certified company, we are committed to supply superior quality products matching the customers' requirements to ensure their total satisfaction. All our products are checked thoroughly and repeatedly during and after the production process to guarantee complete flawlessness. The inspections are carried out by the specialized experts with an eye for the details. 
            <br />
            <br />
            <strong>Our Quality Objectives</strong><br />
            » To Reduce Internal Rejection.<br />
            » To minimize customer complaints.<br />
            » To enhance customer satisfaction.<br />
            » To achieve customers' delivery schedules.
          </p>
        </div>
        <div className="col-md-6 ts-padding about-img" style={{height: 374, background: 'url(/images/brand/original-cycle-hero.webp) 50% 50% / cover no-repeat'}}>
        </div>
      </div>
      <div className="row about-wrapper-bottom">
        <div className="col-md-12 ts-padding about-message">
          <p>We are a well-established enterprise and professionally, with a robust infrastructure. We utilize the most modern technology in making the equipment. We follow a comprehensive system of quality control and ensure that every product is thoroughly checked and inspected, before finally being delivered.<br />
            <br />
            We are committed to furnish superior quality products at economical price with schedule consistency. It is our endeavor to follow the principles of total quality management. The company has developed quality objectives and work plans for quality management. We follow stringent quality control norms by reviewing and monitoring each product.<br />
            <br />
            Each product of our range is tested as per the internationally accepted standards using various test procedures. In addition, <strong>we also facilitates specific testing as per the client's requirement.</strong> For quality control, we have a team of quality checking staff.</p>
        </div>
      </div>
    </div>
  </section>
</div>
);}
