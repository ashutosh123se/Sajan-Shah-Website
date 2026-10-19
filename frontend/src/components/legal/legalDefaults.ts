export interface DefaultLegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  content: string;
}

export const DEFAULT_LEGAL_PAGES: Record<string, DefaultLegalPage> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    lastUpdated: 'April 1, 2026',
    content: `
      <p class="text-sm text-gray-500 mb-6">Last Updated: April 1, 2026</p>

      <h2>1. Introduction</h2>
      <p>Sajan Shah Foundation ("we", "our", or "us") is committed to protecting the privacy and personal data of our users, students, attendees, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, or use any of our services.</p>

      <h2>2. Scope of Policy</h2>
      <p>This policy applies to all platforms and services operated by Sajan Shah Foundation, including:</p>
      <ul>
        <li>Sajan Shah Official Website</li>
        <li>Sajan Shah Mobile Application</li>
        <li>AI Sajan Shah Platform</li>
        <li>Live to Inspire Charitable Trust</li>
        <li>United First Initiative</li>
        <li>Events, webinars, and training programs</li>
      </ul>

      <h2>3. Information We Collect</h2>
      <h3>3.1 Information You Provide</h3>
      <p>We may collect personal information voluntarily provided by you, including:</p>
      <ul>
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Residential Address</li>
        <li>Payment-related details (processed via secure third-party gateways)</li>
      </ul>
      <p>This information is collected when you register, make purchases, or communicate with us.</p>

      <h3>3.2 Information Collected Automatically</h3>
      <p>We may automatically collect certain technical and usage data, including:</p>
      <ul>
        <li>IP Address</li>
        <li>Device and Browser Information</li>
        <li>Website/App Usage Behavior</li>
        <li>Interaction Data</li>
      </ul>
      <p>This helps us enhance functionality and user experience.</p>

      <h3>3.3 AI Interaction Data</h3>
      <p>When you use AI Sajan Shah:</p>
      <ul>
        <li>Conversations may be stored and analyzed</li>
        <li>Data may be used to improve AI performance</li>
        <li>Users are advised not to share sensitive or confidential information</li>
        <li>Confidentiality of AI interactions cannot be guaranteed</li>
      </ul>

      <h2>4. Purpose of Data Collection</h2>
      <p>We use your information for the following purposes:</p>
      <ul>
        <li>To provide and manage our services</li>
        <li>To personalize user experience</li>
        <li>To process transactions securely</li>
        <li>To communicate updates, offers, and notifications</li>
        <li>To analyze performance and improve services</li>
      </ul>

      <h2>5. Sharing of Information</h2>
      <p>We do not sell your personal information.</p>
      <p>We may share your data with:</p>
      <ul>
        <li>Payment gateway providers</li>
        <li>Webinar and communication platforms</li>
        <li>Technical and analytics service providers</li>
      </ul>
      <p>Such parties are required to maintain confidentiality and comply with applicable laws. We may also disclose information where required by law or to protect rights, safety, or property.</p>

      <h2>6. Payment Security</h2>
      <p>All financial transactions are processed through secure third-party payment gateways. Sajan Shah Foundation does not store your credit or debit card information.</p>

      <h2>7. Cookies and Tracking Technologies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Improve website functionality</li>
        <li>Analyze user behavior</li>
        <li>Deliver personalized content</li>
      </ul>
      <p>You may disable cookies through your browser settings; however, some features may be limited.</p>

      <h2>8. Data Security</h2>
      <p>We implement industry-standard security measures, including:</p>
      <ul>
        <li>Secure server infrastructure</li>
        <li>Controlled access to data</li>
        <li>Periodic security reviews</li>
      </ul>
      <p>While we strive to protect your data, no method of transmission over the internet is completely secure.</p>

      <h2>9. User Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal data</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>
      <p>To exercise these rights, please contact us using the details provided below.</p>

      <h2>10. Data Retention</h2>
      <p>We retain personal data only for as long as necessary to:</p>
      <ul>
        <li>Fulfill the purposes outlined in this Policy</li>
        <li>Comply with legal and regulatory obligations</li>
        <li>Support legitimate business requirements</li>
      </ul>

      <h2>11. Third-Party Links</h2>
      <p>Our platforms may contain links to external websites. Sajan Shah Foundation is not responsible for the privacy practices or content of such third-party sites.</p>

      <h2>12. Children's Privacy</h2>
      <p>We do not knowingly collect personal data from minors without parental consent. Parents and guardians are encouraged to monitor children's online activities.</p>

      <h2>13. Events and Social Initiatives</h2>
      <p>Participation in events, programs, and social initiatives may involve photography and video recording. Such content may be used for promotional, educational, and awareness purposes by the Foundation.</p>

      <h2>14. International Data Transfer</h2>
      <p>All data is processed and stored in India. By using our platforms, you consent to the transfer and processing of your information in India.</p>

      <h2>15. Data Breach Response</h2>
      <p>In the event of a data breach, Sajan Shah Foundation will take appropriate corrective measures and notify affected users as required by applicable laws.</p>

      <h2>16. Changes to This Policy</h2>
      <p>We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting. Users are encouraged to review this Policy periodically.</p>

      <h2>17. Contact Information</h2>
      <p>For any questions, concerns, or data-related requests, please contact:</p>
      <p><strong>Sajan Shah Foundation</strong><br />
      8 Deepawali Complex, Near Income Tax Cross Road<br />
      Ashram Road, Opp. Old High Court Road<br />
      Ahmedabad, Gujarat – 380009, India<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>

      <h2>18. Grievance Officer</h2>
      <p>Grievance Officer — Sajan Shah Foundation<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>

      <h2>19. Acceptance of Policy</h2>
      <p>By accessing or using our platforms, you confirm that you have read, understood, and agreed to this Privacy Policy.</p>
    `,
  },

  'terms-of-service': {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    lastUpdated: 'April 1, 2026',
    content: `
      <p class="text-sm text-gray-500 mb-6">Last Updated: April 1, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing this Website, accessible from https://sajanshah.com/ (and associated platforms), you agree to be bound by these Terms and Conditions of Use and all applicable laws and regulations.</p>
      <p>If you do not agree with any of these terms, you are prohibited from using this Website or any related services.</p>

      <h2>2. Scope of Services</h2>
      <p>These Terms apply to all services provided by Sajan Shah Foundation, including:</p>
      <ul>
        <li>Website</li>
        <li>Sajan Shah Mobile Application</li>
        <li>AI Sajan Shah Platform</li>
        <li>Events, Webinars, and Programs</li>
        <li>Books and Digital Products</li>
        <li>Live to Inspire Charitable Trust</li>
        <li>United First Initiative</li>
      </ul>

      <h2>3. Use License</h2>
      <p>Permission is granted to temporarily access and download materials for personal, non-commercial use only.</p>
      <p>Under this license, you may not:</p>
      <ul>
        <li>Modify or copy materials</li>
        <li>Use materials for commercial purposes</li>
        <li>Reverse engineer any software</li>
        <li>Remove proprietary notices</li>
        <li>Mirror content on other platforms</li>
      </ul>
      <p>Violation of these terms will result in termination of access.</p>

      <h2>4. Mobile Application Usage</h2>
      <p>Users of the Sajan Shah Mobile Application agree that:</p>
      <ul>
        <li>Account information must be accurate</li>
        <li>Accounts are personal and non-transferable</li>
        <li>Unauthorized use or sharing of accounts is prohibited</li>
        <li>Subscription services (if applicable) may auto-renew unless cancelled</li>
      </ul>

      <h2>5. AI Sajan Shah Platform Disclaimer</h2>
      <p>The AI Sajan Shah platform provides educational and informational guidance only. It does not provide:</p>
      <ul>
        <li>Medical advice</li>
        <li>Legal advice</li>
        <li>Financial advice</li>
        <li>Psychological or therapeutic services</li>
      </ul>
      <p>Users acknowledge that:</p>
      <ul>
        <li>AI responses are automated and may not be accurate</li>
        <li>Decisions based on AI outputs are at the user's own risk</li>
        <li>Sensitive or confidential information should not be shared</li>
      </ul>

      <h2>6. Payments, Refunds & Purchases</h2>
      <p>All payments for programs, events, and products are subject to terms communicated at the time of purchase.</p>
      <ul>
        <li>Fees are generally non-refundable, unless explicitly stated</li>
        <li>No refunds for accessed digital content or missed sessions</li>
      </ul>
      <p>Please refer to our Refund Policy for detailed terms.</p>

      <h2>7. User-Generated Content</h2>
      <p>By submitting any content (including testimonials, feedback, or media), you grant Sajan Shah Foundation a non-exclusive, royalty-free right to use, display, publish, and distribute such content for promotional and business purposes.</p>

      <h2>8. Media Consent</h2>
      <p>By attending events, programs, or webinars, you consent to photography and video recording, and use of your image, voice, or participation in marketing, media, or promotional content.</p>

      <h2>9. Disclaimer</h2>
      <p>All materials and services are provided on an "as is" basis. Sajan Shah Foundation makes no warranties regarding accuracy or completeness, reliability of content, or guaranteed results or outcomes.</p>

      <h2>10. Limitation of Liability</h2>
      <p>Sajan Shah Foundation shall not be liable for any direct or indirect damages, loss of data, income, or opportunity, or decisions based on content or AI outputs.</p>

      <h2>11. User Conduct</h2>
      <p>Users agree not to engage in illegal activities, disrupt services, misuse content or platforms, or harass or harm other users. Violation may result in suspension or termination.</p>

      <h2>12. Termination of Access</h2>
      <p>We reserve the right to suspend or terminate access to our platforms at any time if these Terms are violated or misuse or abuse is detected.</p>

      <h2>13. Intellectual Property Rights</h2>
      <p>All content and branding are owned by Sajan Shah Foundation, including Sajan Shah App, AI Sajan Shah, United First, and Live to Inspire. Unauthorized use is strictly prohibited.</p>

      <h2>14. Third-Party Links</h2>
      <p>We are not responsible for content or practices of third-party websites linked from our platform. Use of such websites is at your own risk.</p>

      <h2>15. Privacy & Data Usage</h2>
      <p>Your use of this Website involves data collection and usage as described in our Privacy Policy.</p>

      <h2>16. Age Restriction</h2>
      <p>Users must be at least 13 years of age or have parental/guardian consent to use our services.</p>

      <h2>17. Force Majeure</h2>
      <p>Sajan Shah Foundation shall not be held liable for failure or delay in performance due to events beyond reasonable control, including natural disasters, technical failures, government actions, or network disruptions.</p>

      <h2>18. Governing Law & Jurisdiction</h2>
      <p>These Terms shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes shall be subject to the exclusive jurisdiction of courts in Ahmedabad.</p>

      <h2>19. Modifications to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. Continued use of the Website constitutes acceptance of updated Terms.</p>

      <h2>20. Communication Policy</h2>
      <p>By registering or providing your details, you agree to receive emails, SMS/WhatsApp messages, and calls for updates, promotions, and service-related communication. You may opt out at any time.</p>

      <h2>21. Contact Information</h2>
      <p><strong>Sajan Shah Foundation</strong><br />
      8 Deepawali Complex, Near Income Tax Cross Road<br />
      Ashram Road, Opp. Old High Court Road<br />
      Ahmedabad, Gujarat – 380009, India<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>

      <h2>22. Acceptance of Terms</h2>
      <p>By accessing or using our platforms, you confirm that you have read, understood, and agreed to these Terms and Conditions.</p>
    `,
  },

  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms and Conditions',
    lastUpdated: 'April 1, 2026',
    content: `
      <p class="text-sm text-gray-500 mb-6">Last Updated: April 1, 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing this Website, accessible from https://sajanshah.com/ (and associated platforms), you agree to be bound by these Terms and Conditions of Use and all applicable laws and regulations.</p>
      <p>If you do not agree with any of these terms, you are prohibited from using this Website or any related services.</p>

      <h2>2. Scope of Services</h2>
      <p>These Terms apply to all services provided by Sajan Shah Foundation, including Website, Mobile Application, AI Sajan Shah Platform, Events, Webinars, Programs, Books, and Digital Products.</p>

      <h2>3. Use License</h2>
      <p>Permission is granted to temporarily access and download materials for personal, non-commercial use only. Under this license you may not modify or copy materials, use for commercial purposes, reverse engineer software, or remove proprietary notices.</p>

      <h2>4. Mobile Application Usage</h2>
      <p>Users of the Sajan Shah Mobile Application agree that account information must be accurate, accounts are personal and non-transferable, and unauthorized sharing is strictly prohibited.</p>

      <h2>5. AI Sajan Shah Platform Disclaimer</h2>
      <p>The AI Sajan Shah platform provides educational and informational guidance only. It does not provide medical, legal, financial, or psychological services. Decisions based on AI outputs are at the user's own risk.</p>

      <h2>6. Payments, Refunds & Purchases</h2>
      <p>All payments for programs, events, and products are subject to terms communicated at the time of purchase. Fees are generally non-refundable unless explicitly stated. Refer to our Refund Policy for details.</p>

      <h2>7. User-Generated Content & Media Consent</h2>
      <p>By submitting testimonials, feedback, or attending live/virtual events, you grant Sajan Shah Foundation rights to use and display content for educational and promotional purposes.</p>

      <h2>8. Limitation of Liability & Disclaimer</h2>
      <p>All materials and services are provided "as is". Sajan Shah Foundation shall not be liable for any indirect or consequential damages, loss of data, income, or opportunities.</p>

      <h2>9. Governing Law & Jurisdiction</h2>
      <p>These Terms shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes are subject to the exclusive jurisdiction of courts in Ahmedabad.</p>

      <h2>10. Contact Information</h2>
      <p><strong>Sajan Shah Foundation</strong><br />
      8 Deepawali Complex, Near Income Tax Cross Road<br />
      Ashram Road, Opp. Old High Court Road<br />
      Ahmedabad, Gujarat – 380009, India<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>
    `,
  },

  'refund-policy': {
    slug: 'refund-policy',
    title: 'Refund & Replacement Policy',
    lastUpdated: 'April 1, 2026',
    content: `
      <h2>1. Introduction</h2>
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
      <p>No refunds will be provided. Alternative options include access to the next session (subject to availability) or recording access if applicable.</p>
      <p><strong>3.2 Full Payment – Satisfaction Based Review</strong></p>
      <p>Refund requests may be submitted within the defined timeline. Each case will be reviewed individually. Approved refunds will be processed accordingly.</p>
      <p><strong>3.3 Token Payments / Partial Payments</strong></p>
      <ul>
        <li>Refund requests must be made within 48 hours of payment</li>
        <li>After 48 hours, token amounts are non-refundable</li>
        <li>Failure to complete remaining payment may result in cancellation without refund</li>
      </ul>
      <p><strong>3.4 Digital Products (IMPORTANT)</strong></p>
      <p>No refunds will be provided once the product has been accessed, viewed, downloaded, or credentials have been issued.</p>
      <p><strong>3.5 No-Show Policy</strong></p>
      <p>If a participant fails to attend without prior notice within the required timeline, no refund or transfer will be provided.</p>
      <p><strong>3.6 Cancellation by Foundation</strong></p>
      <p>If Sajan Shah Foundation cancels or reschedules, a full refund or transfer to the next available session will be provided.</p>

      <h3>4. General Conditions & Processing</h3>
      <p>Refund requests must be sent to: <strong>support.ind@sajanshah.com</strong> within 7 days of purchase or event date with payment proof and reason. Approved refunds are processed within 7–10 working days via the original payment method or bank transfer.</p>

      <h3>5. Replacement Policy (Physical Products)</h3>
      <p>Replacement is applicable only if the product is defective, damaged, or incorrect, and requested within 48 hours of delivery. Products must be unused and in original packaging.</p>

      <h3>6. Contact Information</h3>
      <p><strong>Sajan Shah Foundation</strong><br />
      8 Deepawali Complex, Near Income Tax Cross Road<br />
      Ashram Road, Opp. Old High Court Road<br />
      Ahmedabad, Gujarat – 380009, India<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>
    `,
  },

  'ai-policy': {
    slug: 'ai-policy',
    title: 'Artificial Intelligence (AI) Usage Policy & Disclaimer',
    lastUpdated: 'April 1, 2026',
    content: `
      <h2>1. Introduction</h2>
      <p>This Artificial Intelligence ("AI") Usage Policy governs the use of all AI-enabled systems and tools provided by Sajan Shah Foundation ("Foundation", "we", "our", or "us"), including AI Sajan Shah and all integrated AI features.</p>

      <h2>2. Purpose of AI Systems</h2>
      <p>AI systems within Sajan Shah Foundation are designed to provide educational and motivational insights, assist with learning and productivity, and support personal development. All AI services are strictly for informational and educational purposes.</p>

      <h2>3. No Professional Advice</h2>
      <p>AI-generated responses do not constitute medical, psychological, legal, or financial advice. Users must consult qualified professionals for any specific matters.</p>

      <h2>4. AI Sajan Shah Specifics</h2>
      <p>AI Sajan Shah is an AI-powered assistant. Users acknowledge that AI Sajan Shah is not Sajan Shah personally, responses are automated, and outputs are generated based on algorithms and training data.</p>

      <h2>5. User Responsibility & Privacy</h2>
      <p>Users are solely responsible for their decisions. Do not share confidential, sensitive personal, or financial information within AI prompts. Conversations may be analyzed for quality and system improvement.</p>

      <h2>6. Intellectual Property & Acceptable Use</h2>
      <p>All AI models, prompts, and outputs are the intellectual property of Sajan Shah Foundation. Reverse engineering, scraping, or commercial resale of outputs is strictly prohibited.</p>

      <h2>7. Contact Information</h2>
      <p>For questions regarding AI usage and governance:<br />
      Email: <a href="mailto:support.ind@sajanshah.com">support.ind@sajanshah.com</a></p>
    `,
  },
};
