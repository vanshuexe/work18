import './legacy.css';
import './globals.css';
import './redesign.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WebsiteInteractions from '../components/WebsiteInteractions';

export const metadata = {
  title: 'Harison Cycle Industries',
  description: 'Manufacturer of bicycle carriers, stands, accessories and two wheeler parts in Ludhiana, India.',
  icons: { icon: '/images/brand/favicon.png', apple: '/images/brand/apple-touch-icon.png' },
};
export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><div className="body-inner"><Header/><main id="main-content">{children}</main><Footer/><WebsiteInteractions/></div></body></html>;
}
