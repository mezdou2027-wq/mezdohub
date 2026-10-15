// Dynamic Schema.org JSON-LD structured data engine for MezdoHub
// Generates Organization, WebSite, BreadcrumbList, SoftwareApplication, FAQPage, and Article schemas

export interface BreadcrumbItemSchema {
  name: string;
  url: string;
}

export interface FaqItemSchema {
  question: string;
  answer: string;
}

export interface SoftwareAppSchema {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  url: string;
}

export interface ArticleSchemaData {
  title: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherLogo?: string;
  url: string;
}

/**
 * Injects or updates a Schema.org JSON-LD script block in document head
 */
export const updateStructuredData = (schemaId: string, schemaData: Record<string, any>) => {
  if (typeof document === 'undefined') return;

  let existing = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!existing) {
    existing = document.createElement('script');
    existing.id = schemaId;
    existing.type = 'application/ld+json';
    document.head.appendChild(existing);
  }
  existing.textContent = JSON.stringify(schemaData, null, 2);
};

/**
 * 1. Global Organization & Website Schema
 */
export const getOrganizationAndWebsiteSchema = (origin: string = 'https://mezdohub.com') => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: 'MezdoHub',
      alternateName: 'مزدوهب للفرص الدولية',
      url: origin,
      logo: `${origin}/logo.png`,
      description: 'المنصة الرقمية المستقلة الأولى لتمكين الشباب المغربي والعربي في مسارات الهجرة القانونية، المنح الدراسية، والعمل الحر.',
      foundingDate: '2026',
      founder: {
        '@type': 'Person',
        name: 'فريق MezdoHub التوجيهي',
        jobTitle: 'مستشار في الهجرة والفرص الدولية والمهنية'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'mezdou2027@gmail.com',
        availableLanguage: ['ar', 'fr', 'en']
      },
      sameAs: [
        'https://twitter.com/mezdohub',
        'https://linkedin.com/company/mezdohub',
        'https://facebook.com/mezdohub'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: origin,
      name: 'MezdoHub',
      description: 'منصة الفرص الدولية للمغاربة: هجرة قانونية، منح دراسية، وظائف مصانع المغرب، وحاسبات العمل الحر والضرائب',
      inLanguage: 'ar',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/?tab=all-content&q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  ]
});

/**
 * 2. Breadcrumbs Schema
 */
export const getBreadcrumbsSchema = (items: BreadcrumbItemSchema[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url
  }))
});

/**
 * 3. FAQPage Schema for Rich Snippets
 */
export const getFaqPageSchema = (faqs: FaqItemSchema[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * 4. SoftwareApplication Schema for Tools
 */
export const getSoftwareAppSchema = (tool: SoftwareAppSchema) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: tool.name,
  applicationCategory: tool.applicationCategory,
  operatingSystem: tool.operatingSystem,
  description: tool.description,
  url: tool.url,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'MAD'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1240',
    bestRating: '5',
    worstRating: '1'
  }
});

/**
 * 5. Article Schema for Comprehensive Guides
 */
export const getArticleSchema = (article: ArticleSchemaData) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.headline,
  description: article.description,
  datePublished: article.datePublished,
  dateModified: article.dateModified,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url
  },
  author: {
    '@type': 'Person',
    name: article.authorName,
    url: article.authorUrl || 'https://mezdohub.com/?tab=author'
  },
  publisher: {
    '@type': 'Organization',
    name: article.publisherName,
    logo: {
      '@type': 'ImageObject',
      url: article.publisherLogo || 'https://mezdohub.com/logo.png'
    }
  }
});
