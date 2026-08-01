/** Current live Impact Stories defaults — CMS/seed baseline matches this. */

export type ImpactStoryItem = {
  id?: string | number;
  order?: number;
  isActive?: boolean;
  title: string;
  excerpt: string;
  imageUrl?: string;
  authorName?: string;
  authorRole?: string;
  date?: string;
  readTime?: string;
  pullQuote?: string;
  /** Full article HTML rendered in the story modal */
  bodyHtml: string;
};

export type ImpactStoriesContent = {
  heading: string;
  subHeading: string;
  stories: ImpactStoryItem[];
};

export const DEFAULT_IMPACT_STORIES: ImpactStoriesContent = {
  heading: 'CASE STUDIES',
  subHeading: 'Impact Stories',
  stories: [
    {
      id: 1,
      order: 1,
      isActive: true,
      title: '5 Million Plantable Pencils',
      excerpt:
        "5 Million Opportunities to Change India's Future. What if a simple pencil could become a tool for climate action?",
      authorName: 'Sajan Shah',
      authorRole: 'Founder, Live to Inspire',
      date: 'May 15, 2024',
      readTime: '5 Min Read',
      pullQuote: '"What if a simple pencil could become a tool for climate action?"',
      bodyHtml: `
<p class="drop-cap">Over the last few years, Live to Inspire Charitable Trust has distributed more than 5 million plantable seed pencils to students from Grade 4 to Grade 10 across 25 States, 2 Union Territories, and 130+ cities in India.</p>
<p>At first glance, it looks like a stationery distribution drive. In reality, it is a nationwide movement to create environmental awareness among the next generation.</p>
<h4>Why Does This Matter?</h4>
<p>According to the United Nations, the world must significantly accelerate climate action to meet the Sustainable Development Goals by 2030. Yet environmental awareness alone is not enough. Action is required.</p>
<p>A plantable pencil creates that action. Instead of becoming waste after use, the pencil can be planted in soil and transformed into a living plant.</p>
<p>One pencil. One seed. One lesson in sustainability.</p>
<h4>The Power of 5 Million Pencils</h4>
<ul>
  <li>5 Million+ Plantable Pencils Distributed</li>
  <li>25 States Reached</li>
  <li>2 Union Territories Covered</li>
  <li>130+ Cities Engaged</li>
  <li>Lakhs of Students Directly Impacted</li>
  <li>Millions of Family Members Indirectly Influenced</li>
</ul>
<h4>Creating Climate Ambassadors</h4>
<p>Most children learn about climate change through textbooks. Very few participate in climate action themselves.</p>
<p>When a child plants a pencil and nurtures its growth, they learn: Responsibility, Patience, Environmental stewardship, and Sustainable living.</p>
<p>More importantly, they carry these values home. One student influences an entire family. One classroom influences a community. One generation influences a nation.</p>
<h4>Supporting UN SDGs 2030</h4>
<ul>
  <li>SDG 13 – Climate Action</li>
  <li>SDG 4 – Quality Education</li>
  <li>SDG 12 – Responsible Consumption and Production</li>
  <li>SDG 15 – Life on Land</li>
</ul>
<h4>A Movement, Not a Distribution Drive</h4>
<p>The true achievement is not distributing 5 million pencils. The true achievement is inspiring millions of young minds to think differently about the environment.</p>
<p class="accent">Because every plantable pencil carries a powerful message: "When learning ends, life begins."</p>
`.trim(),
    },
    {
      id: 2,
      order: 2,
      isActive: true,
      title: '15 Million Lives Impacted. Season of Learning',
      excerpt:
        'One Mission: Preparing India for 2030 through neuroscience-based education and social transformation.',
      authorName: 'Sajan Shah',
      authorRole: 'Memory Man of India & Founder',
      date: 'April 22, 2024',
      readTime: '7 Min Read',
      pullQuote: '"What if education could transform not just students, but entire cities?"',
      bodyHtml: `
<p class="drop-cap">For the last 8 years, the Season of Learning (SOL) Initiative has been doing exactly that—building future-ready students, stronger families, responsible citizens, and socially conscious communities through neuroscience-based education and social transformation.</p>
<p>Today, SOL stands as one of India's most impactful educational outreach movements.</p>
<h4>Impact by the Numbers</h4>
<div class="stats-grid">
  <div>
    <h5>Since Inception</h5>
    <ul>
      <li>15 Million+ Lives Impacted</li>
      <li>8 Years of Continuous Execution</li>
      <li>Hundreds of Cities Reached</li>
      <li>Thousands of Schools Engaged</li>
      <li>Millions of Students, Parents, and Educators Benefited</li>
    </ul>
  </div>
  <div>
    <h5>Every Month</h5>
    <ul>
      <li>2 Cities Transformed &amp; 60 Schools Reached</li>
      <li>480 School Sessions Conducted</li>
      <li>50,000+ People Directly Impacted</li>
      <li>5 Public Mega Shows Conducted</li>
    </ul>
  </div>
</div>
<h4>Why Season of Learning?</h4>
<p>The world of 2030 will demand more than academic knowledge. It will require: Critical Thinking, Emotional Intelligence, Character, Leadership, Civic Sense, Adaptability, and Social Responsibility.</p>
<p>Yet most students are never formally taught these life skills. Season of Learning bridges that gap.</p>
<h4>Driving the UN SDGs</h4>
<ul>
  <li><strong>SDG 4 – Quality Education:</strong> Making learning practical, relevant, and future-focused.</li>
  <li><strong>SDG 5 – Gender Equality:</strong> Promoting respect, inclusion, and equal opportunities.</li>
  <li><strong>SDG 13 – Climate Action:</strong> Encouraging environmental responsibility and sustainable behavior.</li>
</ul>
<h4>The Real Impact</h4>
<p>The biggest achievement of Season of Learning is not the number of sessions conducted. It is the number of lives transformed.</p>
<p>A student discovers confidence. A parent gains a new perspective. A teacher inspires differently. A community becomes stronger. A city becomes more aware. And slowly, a nation moves forward.</p>
<p class="accent">Season of Learning is not a program. It is a movement for the future of India.</p>
`.trim(),
    },
    {
      id: 3,
      order: 3,
      isActive: true,
      title: '50,000 UV Protection Glasses',
      excerpt:
        "How Live to Inspire Charitable Trust Is Supporting India's Frontline Sanitation Workers.",
      authorName: 'Sajan Shah',
      authorRole: 'Founder, Live to Inspire',
      date: 'March 10, 2024',
      readTime: '6 Min Read',
      pullQuote:
        'Every morning, before most cities wake up, millions of sanitation workers begin their day. They clean our roads. They collect our waste. They maintain public hygiene. They protect public health.',
      bodyHtml: `
<p class="drop-cap">Yet, many of these frontline workers continue to perform their duties without adequate protection from dust, pollution, harmful particles, sunlight, and airborne infections.</p>
<p>At Live to Inspire Charitable Trust, we believe that those who protect our communities deserve protection themselves.</p>
<p>Every year, we distribute 50,000 UV Protection Glasses and 250,000 Protective Masks to sanitation workers across 15 States and 2 Union Territories of India. Because dignity begins with safety.</p>
<h4>The Invisible Health Risk</h4>
<p>Sanitation workers face daily exposure to dust, harmful waste particles, air pollution, UV radiation, eye irritation, and respiratory challenges.</p>
<p>While society often notices the cleanliness they create, very few recognize the health risks they endure.</p>
<h4>The Power of a Simple Safety Kit</h4>
<ul>
  <li>50,000 UV Protection Glasses</li>
  <li>5 Protective Masks per Worker (250,000 Annually)</li>
  <li>15 States Covered &amp; 2 Union Territories Reached</li>
</ul>
<p>These are not merely products. They are preventive health tools. For thousands of workers, these simple tools become a shield against occupational health risks.</p>
<h4>More Than Distribution: Restoring Dignity</h4>
<p>The impact of this initiative goes beyond physical protection. It sends a powerful message: <em>"Your work matters. Your health matters. Your life matters."</em></p>
<p>When we provide protective equipment, we are not only improving workplace safety—we are recognizing their dignity and contribution to society.</p>
<h4>Supporting the UN SDGs 2030</h4>
<ul>
  <li><strong>SDG 3 – Good Health and Well-Being:</strong> Promoting better occupational health.</li>
  <li><strong>SDG 8 – Decent Work and Economic Growth:</strong> Contributing to safer workplaces.</li>
  <li><strong>SDG 10 – Reduced Inequalities:</strong> Supporting vulnerable communities.</li>
  <li><strong>SDG 11 – Sustainable Cities and Communities:</strong> Strengthening the foundation of urban communities.</li>
</ul>
<h4>A Call for Collective Responsibility</h4>
<p>If every organization, institution, corporation, and citizen contributed even a small effort toward protecting frontline workers, the impact would be transformative.</p>
<p class="accent">Because a cleaner India begins with healthier sanitation workers.</p>
`.trim(),
    },
  ],
};

export function normalizeImpactStoriesContent(
  raw?: Partial<ImpactStoriesContent> | null
): ImpactStoriesContent {
  const storiesIn = Array.isArray(raw?.stories) ? raw!.stories! : [];
  const stories =
    storiesIn.length > 0
      ? storiesIn
          .filter((s) => s && s.isActive !== false)
          .map((s, i) => ({
            id: s.id ?? i + 1,
            order: typeof s.order === 'number' ? s.order : i + 1,
            isActive: s.isActive !== false,
            title: s.title || `Story ${i + 1}`,
            excerpt: s.excerpt || '',
            imageUrl: s.imageUrl || '',
            authorName: s.authorName || 'Sajan Shah',
            authorRole: s.authorRole || 'Founder, Live to Inspire',
            date: s.date || '',
            readTime: s.readTime || '',
            pullQuote: s.pullQuote || '',
            bodyHtml: s.bodyHtml || '',
          }))
          .sort((a, b) => a.order - b.order)
      : DEFAULT_IMPACT_STORIES.stories;

  return {
    heading: raw?.heading || DEFAULT_IMPACT_STORIES.heading,
    subHeading: raw?.subHeading || DEFAULT_IMPACT_STORIES.subHeading,
    stories,
  };
}
