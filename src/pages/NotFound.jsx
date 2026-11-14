import { Link } from 'react-router-dom';
import { PageHead, PageMeta } from '../components/Blocks';

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found | DS Groups" />
      <PageHead className="type-only" title="Page not found" lede="The page you were looking for has moved or no longer exists." />
      <section className="section">
        <div className="wrap">
          <div className="actions" data-reveal><Link className="btn" to="/">Back to home</Link></div>
        </div>
      </section>
    </>
  );
}
