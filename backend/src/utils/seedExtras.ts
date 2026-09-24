import { db } from './database';

export const defaultInitiatives = [
  {
    slug: 'ethos-global-advisory',
    title: 'Ethos Global Advisory',
    description: 'Strategic consultancy for social impact.',
    imageUrl: '/Our Core Initiatives/Ethos Global Advisory cover.png',
    linkUrl: 'modal:ethos',
    order: 1,
  },
  {
    slug: 'live-to-inspire',
    title: 'Live to Inspire',
    description: 'Our core foundation for large-scale impact.',
    imageUrl: '/live to bg.jpeg',
    linkUrl: 'https://www.unitedfirst.in/',
    order: 2,
  },
  {
    slug: 'plantable-pencils-drive',
    title: 'Plantable Pencils Drive',
    description: 'Green education through sustainable tools.',
    imageUrl: '/Our Core Initiatives/Plantable Pencils Drive cover.jpeg',
    linkUrl: 'modal:pencils',
    order: 3,
  },
  {
    slug: 'sajan-shah-app',
    title: 'Sajan Shah App',
    description: 'Digital neuroscience tools in your pocket.',
    imageUrl: '/APP/app.webp',
    linkUrl: 'modal:app',
    order: 4,
  },
  {
    slug: 'season-of-learning',
    title: 'Season of Learning',
    description: 'Continuous education programs for all ages.',
    imageUrl: '/EVENT.png',
    linkUrl: 'https://sol.sajanshah.com/',
    order: 5,
  },
  {
    slug: 'teachers-training-program',
    title: 'Teachers Training Program',
    description: 'Upskilling educators with neuroscience.',
    imageUrl: '/Sir Speaking.jpeg',
    linkUrl: 'https://teachers.sajanshah.com',
    order: 6,
  },
  {
    slug: 'uv-glasses-drive',
    title: 'UV Glasses Drive',
    description: 'Vision health for underprivileged communities.',
    imageUrl: '/Our Core Initiatives/UV Glasses Drive cover.jpeg',
    linkUrl: 'modal:uv',
    order: 7,
  },
  {
    slug: 'united-first-initiative',
    title: 'United First Initiative',
    description: 'Aligning with UN SDGs to drive global change.',
    imageUrl: '/united first.png',
    linkUrl: 'https://www.unitedfirst.in/',
    order: 8,
  },
  {
    slug: 'ymf-youth-motivation-forum',
    title: 'YMF (Youth Motivation Forum)',
    description: 'Empowering the next generation of leaders.',
    imageUrl: '/impact.png',
    linkUrl: '/events#book-sajan',
    order: 9,
  },
];

export const defaultTestimonials = [
  { name: 'Muhammad Faisal', designation: 'Four Times Guinness World Record Holder for Strongest Memory', organization: null, quote: 'Sajan is a passionate motivator and speaker. He just need a mic and stage to improve your productivity.', photoUrl: '/Hero T/Muhammad Faisal.jpeg', order: 1 },
  { name: 'His Holiness Dalai Lama', designation: 'Spiritual Leader', organization: null, quote: 'Sajan is doing commendable work for the development of the country. I really appreciate his efforts and dedication towards building the next generation. Keep up the good work.', photoUrl: '/Hero T/His Holiness Dalai Lama.png', order: 2 },
  { name: 'Acharya Dr. Lokesh Muni', designation: 'World Peace Ambassador, Founder of Ahimsa Vishwa Bharti', organization: null, quote: 'Sajan is very young, dynamic and a smart strategic speaker with amazing practical knowledge and examples. My best wishes are always with him.', photoUrl: '/Hero T/Acharya Dr. Lokesh Muni.png', order: 3 },
  { name: 'Hon. Dr. Jitendra Singh', designation: "Minister of State for Prime Minister's Office", organization: null, quote: 'It was really motivating to hear Sajan in Jammu Kashmir. His vision and mission towards the nation is really inspiring. His passion and energy is amazing. Keep it up Sajan.', photoUrl: '/Hero T/Hon. Dr. Jitendra Singh.jpeg', order: 4 },
  { name: 'Hon. Piyush Goyal', designation: 'Minister of Commerce and Industry', organization: null, quote: "Sajan, not only do you motivate the youth & empower them; but you are serving the nation in a much bigger way. Never stop what you're doing.", photoUrl: '/Hero T/Hon. Piyush Goyal.jpeg', order: 5 },
  { name: 'Sammeer Sata', designation: 'Senior Vice President, Reliance Industries Limited', organization: null, quote: 'Well, first of all, I love watching him LIVE. His energy to enlighten and encourage the people, to achieve their potential to optimum level, is unmatchable! The highly thoughtful programs that he has done have potential which can help anyone to achieve real world class results.', photoUrl: '/Hero T/Sammeer Sata.jpeg', order: 6 },
  { name: 'Dr. A Velumani', designation: 'Promoter & MD, Thyrocare Tech. Ltd.', organization: null, quote: 'Sajan Shah has a clutter less thinking that helps 1000s to get Uncluttered. Met him just for an hour and found him having all that a leader needs.', photoUrl: '/Hero T/Dr. A Velumani.webp', order: 7 },
];

export const defaultLegalPages = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: '<p>Privacy Policy content. Edit this page from Admin → Legal Pages.</p>',
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    content: '<p>Terms of Service content. Edit this page from Admin → Legal Pages.</p>',
  },
  {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    content: '<p>Terms and Conditions content. Edit this page from Admin → Legal Pages.</p>',
  },
  {
    slug: 'refund-policy',
    title: 'Refund & Replacement Policy',
    content: `<h2>1. Introduction</h2>
<p>At Sajan Shah Foundation, we value the trust you place in us. We are committed to delivering high-quality programs, products, and experiences. This policy ensures fairness, transparency, and clarity for all users. By purchasing or registering for any offering, you agree to the terms outlined below.</p>
<h3>2. Scope of Policy</h3>
<p>This policy applies to all offerings, including:</p>
<ul>
<li>Workshops, Events, and Webinars</li>
<li>Training Programs and Courses</li>
<li>Digital Products and Content</li>
<li>Physical Products (Books, Materials, etc.)</li>
<li>Services delivered by Sajan Shah or authorized trainers</li>
</ul>
<h3>3. Refund Policy</h3>
<p><strong>3.1 Low-Value Workshops (₹500 or Below)</strong></p>
<p>No refunds will be provided. Alternative options:</p>
<ul>
<li>Access to next session (subject to availability)</li>
<li>Recording access (if applicable)</li>
</ul>
<p><strong>3.2 Full Payment – Satisfaction Based Review</strong></p>
<p>Refund requests may be submitted within the defined timeline. Each case will be reviewed individually. Approved refunds will be processed accordingly. If a refund is granted, re-enrollment in the same program may not be permitted.</p>
<p><strong>3.3 Token Payments / Partial Payments</strong></p>
<ul>
<li>Refund requests must be made within 48 hours of payment</li>
<li>After 48 hours, token amounts are non-refundable</li>
<li>Failure to complete remaining payment may result in cancellation without refund</li>
</ul>
<p><strong>3.4 Digital Products (IMPORTANT)</strong></p>
<p>No refunds will be provided once:</p>
<ul>
<li>The product has been accessed</li>
<li>The content has been viewed or downloaded</li>
<li>Login credentials have been issued</li>
</ul>
<p><strong>3.5 No-Show Policy</strong></p>
<p>If a participant fails to attend without prior notice or does not inform within required timeline → No refund or transfer will be provided.</p>
<p><strong>3.6 Inability to Attend (Advance Notice)</strong></p>
<p>If informed at least 48 hours prior:</p>
<ul>
<li>One-time transfer to next session allowed</li>
<li>Seat transfer to another participant allowed</li>
</ul>
<p>Conditions: Valid only once. Must be used within a reasonable timeframe.</p>
<p><strong>3.7 Cancellation by Foundation</strong></p>
<p>If Sajan Shah Foundation cancels or reschedules:</p>
<ul>
<li>Full refund will be provided, OR</li>
<li>Transfer to next available session</li>
</ul>
<h3>4. General Conditions</h3>
<p>Refund requests must be sent to: support.ind@sajanshah.com</p>
<p>Include:</p>
<ul>
<li>Payment proof</li>
<li>Reason for request</li>
<li>Requests must be raised within 7 days of purchase or event date (whichever is earlier)</li>
</ul>
<h3>5. Medical & Exception Cases</h3>
<p>In genuine medical emergencies, valid documentation must be provided. Requests will be reviewed on a case-by-case basis.</p>
<h3>6. Fair Usage Policy</h3>
<p>To maintain fairness, misuse of refund policy may lead to rejection. Repeated misuse may result in restriction from future programs.</p>
<h3>7. Refund Processing</h3>
<ul>
<li>Approved refunds processed within 7–10 working days</li>
<li>Refund mode: Original payment method, or Bank transfer</li>
<li>Processing time may vary based on banking systems</li>
</ul>
<h3>8. Payment Terms & Duplicate Payments</h3>
<ul>
<li>Duplicate payments (if any) will be refunded after verification</li>
<li>Payment gateway charges may be deducted where applicable</li>
</ul>
<h3>9. Replacement Policy (Physical Products)</h3>
<p><strong>Eligibility:</strong> Replacement is applicable only if the product is defective, damaged, or incorrect, and the request is made within 48 hours of delivery.</p>
<p><strong>Conditions:</strong> Product must be unused, in original packaging, with invoice.</p>
<p><strong>Return Address:</strong><br />Sajan Shah Foundation<br />8 Deepawali Complex, Near Income Tax Cross Road<br />Ashram Road, Opp. Old High Court Road<br />Ahmedabad, Gujarat – 380009, India</p>
<p><strong>Shipping:</strong> If defect/damage confirmed → we cover shipping. Otherwise → customer may bear return cost.</p>
<h3>10. Force Majeure</h3>
<p>Sajan Shah Foundation shall not be held liable for failure or delay due to events beyond control, including natural disasters, technical failures, government restrictions, or network disruptions.</p>
<h3>11. Pricing Policy</h3>
<ul>
<li>Prices may change at any time without prior notice</li>
<li>Changes will not affect completed purchases</li>
</ul>
<h3>12. Access Termination</h3>
<p>Access to programs or platforms may be revoked if Terms are violated or misconduct or misuse is detected. No refund will be provided in such cases.</p>
<h3>13. Legal Jurisdiction</h3>
<p>This policy is governed by the laws of Ahmedabad, Gujarat, India. All disputes fall under Ahmedabad jurisdiction.</p>
<h3>14. Policy Updates</h3>
<p>Sajan Shah Foundation reserves the right to update this policy at any time. The latest version will always be available on official platforms.</p>
<h3>15. Contact & Support</h3>
<p>For all refund, replacement, or support queries:</p>
<p><strong>Sajan Shah Foundation</strong><br />Email: support.ind@sajanshah.com</p>
<p><strong>16. Final Note</strong></p>
<p>We are committed to fairness, transparency, and delivering value in every interaction. Thank you for trusting Sajan Shah Foundation.</p>`,
  },
  {
    slug: 'ai-policy',
    title: 'Artificial Intelligence (AI) Usage Policy & Disclaimer',
    content: `<h2>1. Introduction</h2>
<p>This Artificial Intelligence (“AI”) Usage Policy governs the use of all AI-enabled systems and tools provided by Sajan Shah Foundation (“Foundation”, “we”, “our”, or “us”).</p>
<p>This includes, but is not limited to:</p>
<ul>
<li>AI Sajan Shah (our proprietary AI assistant)</li>
<li>AI features integrated within our Website and Mobile Application</li>
<li>Any AI-driven tools, recommendations, or automated systems</li>
</ul>
<p>By accessing or using any AI-powered feature, you agree to comply with this Policy.</p>
<h3>2. Purpose of AI Systems</h3>
<p>AI systems within Sajan Shah Foundation are designed to:</p>
<ul>
<li>Provide educational and motivational insights</li>
<li>Assist with learning, productivity, and personal development</li>
<li>Enhance user experience through intelligent recommendations</li>
<li>Support users with general guidance and structured thinking</li>
</ul>
<p>All AI services are intended strictly for informational, educational, and support purposes only.</p>
<h3>3. No Professional Advice</h3>
<p>AI-generated responses do not constitute:</p>
<ul>
<li>Medical or health advice</li>
<li>Psychological or mental health treatment</li>
<li>Legal advice</li>
<li>Financial or investment advice</li>
</ul>
<p>Users must consult qualified professionals for any such matters.</p>
<h3>4. AI Sajan Shah (Specific Reference)</h3>
<p>AI Sajan Shah is an AI-powered assistant built to:</p>
<ul>
<li>Deliver motivational guidance</li>
<li>Provide structured thinking frameworks</li>
<li>Support learning and decision clarity</li>
</ul>
<p>Users acknowledge that:</p>
<ul>
<li>AI Sajan Shah is not Sajan Shah personally</li>
<li>Responses are automated and system-generated</li>
<li>Outputs are based on algorithms and available data</li>
</ul>
<h3>5. User Responsibility</h3>
<p>By using AI systems, you agree that:</p>
<ul>
<li>You are solely responsible for your decisions and actions</li>
<li>You will not rely solely on AI for critical or high-risk decisions</li>
<li>You will use the platform ethically and responsibly</li>
</ul>
<h3>6. Limitations of AI</h3>
<p>Users understand that:</p>
<ul>
<li>AI outputs may be incomplete, inaccurate, or outdated</li>
<li>AI does not guarantee correctness or suitability</li>
<li>Responses may vary and are not personalized professional advice</li>
</ul>
<p>Sajan Shah Foundation makes no warranties regarding AI accuracy or outcomes.</p>
<h3>7. Data Usage & Privacy</h3>
<p>When using AI features:</p>
<ul>
<li>Conversations and inputs may be stored and analyzed</li>
<li>Data may be used to improve AI systems and user experience</li>
<li>Interactions are not guaranteed to be confidential</li>
</ul>
<p>Users are strongly advised: <strong>Not to share sensitive personal, financial, or confidential information.</strong></p>
<p>All data usage is governed by our Privacy Policy.</p>
<h3>8. Prohibited Use</h3>
<p>Users must not use AI systems for:</p>
<ul>
<li>Illegal, harmful, or abusive activities</li>
<li>Generating misleading, offensive, or harmful content</li>
<li>Attempting to exploit, manipulate, or reverse engineer the system</li>
<li>Sharing confidential or third-party sensitive data</li>
</ul>
<p>Violation may result in immediate restriction or termination of access.</p>
<h3>9. Intellectual Property</h3>
<p>All AI systems, models, and outputs are the intellectual property of Sajan Shah Foundation.</p>
<p>Users may not:</p>
<ul>
<li>Copy or redistribute outputs for commercial purposes</li>
<li>Reverse engineer or replicate the AI system</li>
</ul>
<h3>10. Availability & Modifications</h3>
<p>Sajan Shah Foundation reserves the right to:</p>
<ul>
<li>Modify, suspend, or discontinue AI services</li>
<li>Update features, functionality, or policies at any time</li>
</ul>
<p>Continued use constitutes acceptance of updates.</p>
<h3>11. Limitation of Liability</h3>
<p>Sajan Shah Foundation shall not be liable for:</p>
<ul>
<li>Any decisions made based on AI outputs</li>
<li>Any direct or indirect damages</li>
<li>Loss of data, opportunity, or outcomes</li>
</ul>
<p>Use of AI systems is entirely at your own risk.</p>
<h3>12. Age Requirement</h3>
<p>Users must be at least 13 years of age, or have parental/guardian consent, to use AI features.</p>
<h3>13. Termination of Access</h3>
<p>We reserve the right to suspend or terminate access to AI systems if this Policy is violated, or misuse or abuse is detected.</p>
<h3>14. Governing Law</h3>
<p>This Policy shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes shall be subject to the jurisdiction of courts in Ahmedabad.</p>
<h3>15. Contact Information</h3>
<p>For any queries regarding AI usage:</p>
<p><strong>Sajan Shah Foundation</strong><br />Email: support.ind@sajanshah.com</p>
<h3>16. Acceptance of Policy</h3>
<p>By using AI-powered features provided by Sajan Shah Foundation, you confirm that you:</p>
<ul>
<li>Have read and understood this Policy</li>
<li>Agree to comply with all terms</li>
</ul>`,
  }
];

/** Create-only — never overwrites admin-edited content. Fills missing linkUrl only. */
export async function seedInitiatives() {
  for (const initiative of defaultInitiatives) {
    const existing = await db.initiative.findUnique({ where: { slug: initiative.slug } });
    if (!existing) {
      await db.initiative.create({ data: { ...initiative, isActive: true } });
      continue;
    }
    if (!existing.linkUrl && initiative.linkUrl) {
      await db.initiative.update({
        where: { slug: initiative.slug },
        data: { linkUrl: initiative.linkUrl },
      });
    }
  }
  console.log('✅ Initiatives seeded (existing rows left untouched)');
}

export async function seedTestimonials() {
  const existing = await db.testimonial.count();
  if (existing > 0) {
    console.log('⏭️ Testimonials already exist, skipping bulk seed');
    return;
  }

  for (const testimonial of defaultTestimonials) {
    await db.testimonial.create({
      data: { ...testimonial, isActive: true },
    });
  }
  console.log('✅ Testimonials seeded');
}

/** Create-only — never overwrites legal page body. */
export async function seedLegalPages() {
  for (const page of defaultLegalPages) {
    const existing = await db.legalPage.findUnique({ where: { slug: page.slug } });
    if (existing) continue;
    await db.legalPage.create({ data: page });
  }
  console.log('✅ Legal pages seeded (existing rows left untouched)');
}
