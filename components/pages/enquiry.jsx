import Link from 'next/link';
import EnquiryForm from '../EnquiryForm';
export default function PageContent(){return (<div>
  <div id="banner-area">
    
    <div className="parallax-overlay" />
    <div className="banner-title-content">
      <div className="text-center">
        <h2>Enquiry</h2>
        <ul className="breadcrumb">
          <li><Link href="/"> Home</Link></li>
          <li>Enquiry</li>
        </ul>
      </div>
    </div>
  </div>
  <section id="main-container">
    <div className="container">
      <div className="row">
        <div className="contact-info">
          <div className="col-md-8 col-md-offset-2 col-sm-12">
            <div className="form-b pb-5">
              <EnquiryForm />
            </div>
          </div>        
        </div>
      </div>
    </div>
  </section>
</div>
);}
