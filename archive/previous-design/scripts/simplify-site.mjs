import fs from 'node:fs/promises';
const changes={
 'components/pages/home.jsx':[
 ['Made to carry.<br/>Built to <em>last.</em>','Bicycle &amp; Two-Wheeler<br/>Parts Manufacturer'],
 ['Bicycle and two-wheeler components from Ludhiana, India. Explore the range. Find your fit. Build what comes next.','Harison Cycle Industries manufactures carriers, stands, accessories and metal components in Ludhiana, India.'],
 ['Explore components','View products'],['The Harison story','About our company'],
 ['Thoughtful engineering.<br/>Practical purpose.','Manufacturing engineering goods since 1964.'],
 ['/images/brand/original-cycle-hero.webp','/images/catalog/bicycle/hci-154.webp'],
 ['Bicycle carrier and rear wheel in a navy studio','Viking bicycle carrier, HCI-154'],
 ['Every part has<br/>a purpose.','Our Products'],['Engineering roots.<br/>Forward motion.','About Harison Cycle Industries'],
 ['Meet Harison','Read more'],['Inside the making','Manufacturing Facilities'],['Care in the details','Quality Control'],
 ['Connections beyond the factory.','News & Events'],['A few useful answers.','Product Enquiries'],
 ],
 'components/CompanyPages.jsx':[
 ['title={<>Engineering roots.<br/>Since 1964.</>}','title="About Us"'],
 ['From light engineering to everyday components, our story starts in Ludhiana and continues with every part we make.','Manufacturers of bicycle and two-wheeler components based in Ludhiana, Punjab.'],
 ['Engineering roots.<br/>Generations of experience.','Manufacturing engineering goods since 1964.'],
 ['Built on hands-on engineering.','Our Company'],['One craft. More possibilities.','Company History'],['Components for the ride','Bicycle Parts'],['A broader road ahead','Two-Wheeler Parts'],['Explore what we make.','Our Product Range'],
 ['title={<>Material in.<br/>Motion out.</>}','title="Infrastructure"'],['Connected processes.<br/>Consistent attention.','Manufacturing Facilities'],['Inside the making.','Factory & Equipment'],
 ['title={<>Quality in<br/>every detail.</>}','title="Quality Control"'],['The details matter.<br/>At every step.','Inspection & Testing'],['A clear standard to work towards.','Quality Objectives'],
 ['title={<>Beyond<br/>the factory.</>}','title="News & Events"'],['Company exhibitions and moments beyond the factory. Explore the latest event and our exhibition archive.','View our latest exhibition and earlier company events.'],['Years of connections.','Previous Exhibitions'],['Earlier chapters in Harison’s exhibition history.','Company exhibition archive.'],['AGRI EXPO<br/>2026','AGRI EXPO 2026'],
 ['title={<>Talk to<br/>Harison.</>}','title="Contact Us"'],['Tell us what<br/>you’re building.','Product Enquiry'],['Find our locations.','Our Locations'],
 ['title={<>Your next build<br/>starts here.</>}','title="Product Enquiry"'],['Help us find<br/>your fit.','Enquiry Details'],
 ],
 'components/SitePieces.jsx':[['Let’s find the right component.','Need product information?'],['Share your requirement','Send an enquiry']],
 'components/OtherProducts.jsx':[['title={<>Built for the road.<br/>Down to the details.</>}','title="Two-Wheeler Parts"'],['Choose your component.','Product Categories']],
 'components/BicycleCatalog.jsx':[
 ['Support for the journey. Carriers across wheel sizes and finishes.','Bicycle carriers in different wheel sizes and finishes.'],['A steady stop. Discover our bicycle stand range.','Bicycle stand specifications and product details.'],['The finishing touches. Practical components for everyday rides.','Tool boxes, bottle stands and derailleur guards.'],
 ['<span className="heading-dot">.</span>',''],['title="Small parts. Big purpose"','title="Bicycle Parts"'],['Find the component that fits your build. Three focused collections, one place to explore.','Browse bicycle carriers, stands and accessories.'],['Choose your starting point','Product Categories'],['View collection','View products'],
 ],
 'components/Footer.jsx':[['Built for your next project. ↗','Product enquiries ↗'],['Made for motion.','Ludhiana, Punjab, India']],
};
for(const [file,replacements] of Object.entries(changes)){let source=await fs.readFile(file,'utf8');for(const [before,after] of replacements)source=source.replaceAll(before,after);await fs.writeFile(file,source);}
console.log('Simplified headings and copy across all page types.');
