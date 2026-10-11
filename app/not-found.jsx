import Link from 'next/link';
export default function NotFound(){return <section className="container missing-page"><h1>Page not found</h1><p>The page you requested could not be found.</p><Link className="btn btn-primary" href="/">Return home</Link></section>;}
