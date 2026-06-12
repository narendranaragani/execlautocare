import { SEO } from "@/components/layout/SEO";
import { HeroTicker, Hero, Stats, AboutPreview, ServicesOverview, Testimonials, CTABanner } from "./Home";

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Excel Autocare",
  "image": "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&q=80",
  "logo": "https://excelautocare.in/logo.png",
  "@id": "https://excelautocare.in/#autorepair",
  "url": "https://excelautocare.in/",
  "telephone": "+919876543210",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Tech Park Road, Industrial Area",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.081827,
    "longitude": 72.827725
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "15:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2500"
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Mumbai"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Pune"
    }
  ]
};

export default function HomePage() {
  return (
    <div className="bg-background">
      <SEO
        title="Excel Autocare | Maruti Suzuki Authorized Service Center & Car Repair"
        description="Excel Autocare is your premium Maruti Suzuki Authorized Service Center. We provide dealer-grade computerized diagnostics, paint restoration, periodic maintenance, and transparent pricing."
        keywords="Maruti Suzuki service center, car repair workshop, denting painting, wheel alignment, car mechanic near me, car servicing"
        canonicalUrl="https://excelautocare.in/"
        schemaMarkup={homepageSchema}
      />
      <Hero />
      <HeroTicker />
      <AboutPreview />
      <ServicesOverview />
      <Stats />
      <Testimonials />
      <CTABanner />
    </div>
  );
}