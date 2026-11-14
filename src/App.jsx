import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import OurStory from './pages/OurStory';
import OurBrands from './pages/OurBrands';
import BrandPage from './pages/BrandPage';
import GivingBack from './pages/GivingBack';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import GdkBluewater from './pages/GdkBluewater';
import LucyHarman from './pages/LucyHarman';
import JohnPrior from './pages/JohnPrior';
import NotFound from './pages/NotFound';

/* URLs match the original static site so existing links keep working */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="about-us/our-story" element={<OurStory />} />
        <Route path="our-brands" element={<OurBrands />} />
        <Route path="our-brands/domino-brand-page" element={<BrandPage id="dominos" key="dominos" />} />
        <Route path="our-brands/gdk-brand-page-2" element={<BrandPage id="gdk" key="gdk" />} />
        <Route path="our-brands/snap-fitness-brand-page" element={<BrandPage id="snap" key="snap" />} />
        <Route path="giving-back" element={<GivingBack />} />
        <Route path="insights" element={<Insights />} />
        <Route path="contacts" element={<Contact />} />
        <Route path="gdk-bluewater-now-open" element={<GdkBluewater />} />
        <Route path="more-than-90-of-dominos-store-managers-and-area-managers-started-out-as-a-delivery-driver-or-a-pizza-maker" element={<LucyHarman />} />
        <Route path="snap-fitness" element={<JohnPrior />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
