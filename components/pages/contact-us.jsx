import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Contact Us</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container">
    <div className="container">
      <div className="row">
        <div className="contact-info">
          <h3>Contact Details</h3>
        </div>
        <div className="col-sm-12">
          <div className="contact-info">
            <p><strong style={{color: '#CC0000'}}>	HARISON INTERNATIONAL</strong></p>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="contact-info">
            <h4>Unit I</h4>
            <p><i className="fa fa-home info" />  46, Canal Industrial Estate, Sahnewal Dehlon Road, Village Dughri, Ludhiana-141421 </p><br />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="contact-info">
            <h4>Unit II</h4>
            <p><i className="fa fa-home info" />  3488/4, New Janta Nagar, Gill Road, Ludhiana-141003, Punjab, India</p><br />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d109590.74109114449!2d75.80721955810547!3d30.86677485636929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a82f2f111511b%3A0xad503b9fe3121770!2sHARISON%20INTERNATIONAL!5e0!3m2!1sen!2sin!4v1568008416380!5m2!1sen!2sin" width="100%" height={350} frameBorder={0} style={{border: 0}} allowFullScreen loading="lazy" title="Harison International location" />
        </div>
        <div className="col-md-5">
          <div className="contact-info">
            <h3>Contact Details</h3>
            <p><i className="fa fa-phone info" />  +91-161-5071011, 5054400, 2990098 </p>
            <p><i className="fa fa-mobile info" />  +91-98156-93211</p>
            <p><i className="fa fa-envelope-o info" />  dsm@harison.in, psm@harison.in</p>
            <p><i className="fa fa-globe info" />  www.harison.in</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
);}
