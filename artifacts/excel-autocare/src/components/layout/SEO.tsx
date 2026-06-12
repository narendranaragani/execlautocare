import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  schemaMarkup?: object;
}

export function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  schemaMarkup,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update Keywords
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement("meta");
        metaKey.setAttribute("name", "keywords");
        document.head.appendChild(metaKey);
      }
      metaKey.setAttribute("content", keywords);
    }

    // 4. Update Canonical Link
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // 5. Update Open Graph Meta Tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonicalUrl || window.location.href },
    ];
    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content || "");
    });

    // 6. Update JSON-LD Schema
    const existingSchemaScript = document.getElementById("jsonld-schema");
    if (existingSchemaScript) {
      existingSchemaScript.remove();
    }
    if (schemaMarkup) {
      const script = document.createElement("script");
      script.id = "jsonld-schema";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schemaMarkup);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up the JSON-LD schema on unmount to prevent stale schemas on transition
      const script = document.getElementById("jsonld-schema");
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogType, schemaMarkup]);

  return null;
}
export default SEO;
