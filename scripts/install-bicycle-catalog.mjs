import fs from 'node:fs/promises';
const pages={
  'bicycle-parts':"export { BicycleCategories as default } from '../BicycleCatalog';\n",
  carriers:"import BicycleCatalog from '../BicycleCatalog';\nexport default function Carriers(){return <BicycleCatalog category=\"carrier\"/>;}\n",
  stands:"import BicycleCatalog from '../BicycleCatalog';\nexport default function Stands(){return <BicycleCatalog category=\"stand\"/>;}\n",
  accessories:"import BicycleCatalog from '../BicycleCatalog';\nexport default function Accessories(){return <BicycleCatalog category=\"accessories\"/>;}\n",
};
for(const [name,content]of Object.entries(pages))await fs.writeFile('components/pages/'+name+'.jsx',content);
const oldCarrier=['kids-carriers','kids-carriers2','ladies-carriers','ladies-carriers2','mtb-carriers','mtb-carriers2','mtb-carriers3','welded','roadstar-carriers','european-carriers','european-carriers2','european-carriers3','hi-end-carriers','e-bike-carriers'];
for(const name of oldCarrier)await fs.writeFile('components/pages/'+name+'.jsx',"export { default } from './carriers';\n");
for(const name of ['stands2','stands3'])await fs.writeFile('components/pages/'+name+'.jsx',"export { default } from './stands';\n");
for(const name of ['frame','frame-2','forks'])await fs.writeFile('components/pages/'+name+'.jsx',"export { default } from './bicycle-parts';\n");
console.log('Installed approved PDF catalogue and replaced legacy bicycle listings.');
