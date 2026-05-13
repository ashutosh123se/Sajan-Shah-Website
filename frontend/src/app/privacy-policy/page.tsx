'use client';
import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last Updated: April 1, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">

          <Section title="1. Introduction">
            <p>Sajan Shah Foundation ("Foundation", "we", "our", or "us") is committed to safeguarding your privacy and ensuring a secure and transparent user experience across all our platforms.</p>
            <p className="mt-3">This Privacy Policy outlines how we collect, use, store, and protect your personal information when you interact with our services, including:</p>
            <BulletList items={['Official Website','Sajan Shah Mobile Application','AI Sajan Shah Platform','Events, Programs, and Webinars','Live to Inspire Charitable Trust','United First Initiative']} />
            <p className="mt-3">By accessing or using our platforms, you acknowledge that you have read, understood, and agreed to this Privacy Policy.</p>
          </Section>

          <Section title="2. Scope of Policy">
            <p>This Policy applies to all users engaging with Sajan Shah Foundation through digital platforms, applications, events, and offline interactions.</p>
          </Section>

          <Section title="3. Information We Collect">
            <SubSection title="3.1 Information You Provide">
              <p>We may collect personal information voluntarily provided by you, including:</p>
              <BulletList items={['Full Name','Email Address','Phone Number','Residential Address','Payment-related details (processed via secure third-party gateways)']} />
              <p className="mt-2">This information is collected when you register, make purchases, or communicate with us.</p>
            </SubSection>
            <SubSection title="3.2 Information Collected Automatically">
              <p>We may automatically collect certain technical and usage data, including:</p>
              <BulletList items={['IP Address','Device and Browser Information','Website/App Usage Behavior','Interaction Data']} />
              <p className="mt-2">This helps us enhance functionality and user experience.</p>
            </SubSection>
            <SubSection title="3.3 AI Interaction Data">
              <p>When you use AI Sajan Shah:</p>
              <BulletList items={['Conversations may be stored and analyzed','Data may be used to improve AI performance','Users are advised not to share sensitive or confidential information','Confidentiality of AI interactions cannot be guaranteed']} />
            </SubSection>
          </Section>

          <Section title="4. Purpose of Data Collection">
            <p>We use your information for the following purposes:</p>
            <BulletList items={['To provide and manage our services','To personalize user experience','To process transactions securely','To communicate updates, offers, and notifications','To analyze performance and improve services']} />
          </Section>

          <Section title="5. Sharing of Information">
            <p>We do not sell your personal information.</p>
            <p className="mt-2">We may share your data with:</p>
            <BulletList items={['Payment gateway providers','Webinar and communication platforms','Technical and analytics service providers']} />
            <p className="mt-2">Such parties are required to maintain confidentiality and comply with applicable laws. We may also disclose information where required by law or to protect rights, safety, or property.</p>
          </Section>

          <Section title="6. Payment Security">
            <p>All financial transactions are processed through secure third-party payment gateways. Sajan Shah Foundation does not store your credit or debit card information.</p>
          </Section>

          <Section title="7. Cookies and Tracking Technologies">
            <p>We use cookies and similar technologies to:</p>
            <BulletList items={['Improve website functionality','Analyze user behavior','Deliver personalized content']} />
            <p className="mt-2">You may disable cookies through your browser settings; however, some features may be limited.</p>
          </Section>

          <Section title="8. Data Security">
            <p>We implement industry-standard security measures, including:</p>
            <BulletList items={['Secure server infrastructure','Controlled access to data','Periodic security reviews']} />
            <p className="mt-2">While we strive to protect your data, no method of transmission over the internet is completely secure.</p>
          </Section>

          <Section title="9. User Rights">
            <p>You have the right to:</p>
            <BulletList items={['Access your personal data','Request correction of inaccurate information','Request deletion of your data','Opt out of marketing communications']} />
            <p className="mt-2">To exercise these rights, please contact us using the details provided below.</p>
          </Section>

          <Section title="10. Data Retention">
            <p>We retain personal data only for as long as necessary to:</p>
            <BulletList items={['Fulfill the purposes outlined in this Policy','Comply with legal and regulatory obligations','Support legitimate business requirements']} />
          </Section>

          <Section title="11. Third-Party Links">
            <p>Our platforms may contain links to external websites. Sajan Shah Foundation is not responsible for the privacy practices or content of such third-party sites.</p>
          </Section>

          <Section title="12. Children's Privacy">
            <p>We do not knowingly collect personal data from minors without parental consent. Parents and guardians are encouraged to monitor children's online activities.</p>
          </Section>

          <Section title="13. Events and Social Initiatives">
            <p>Participation in events, programs, and social initiatives may involve photography and video recording. Such content may be used for promotional, educational, and awareness purposes by the Foundation.</p>
          </Section>

          <Section title="14. International Data Transfer">
            <p>All data is processed and stored in India. By using our platforms, you consent to the transfer and processing of your information in India.</p>
          </Section>

          <Section title="15. Data Breach Response">
            <p>In the event of a data breach, Sajan Shah Foundation will take appropriate corrective measures and notify affected users as required by applicable laws.</p>
          </Section>

          <Section title="16. Changes to This Policy">
            <p>We reserve the right to update this Privacy Policy at any time. Changes will be effective immediately upon posting. Users are encouraged to review this Policy periodically.</p>
          </Section>

          <Section title="17. Contact Information">
            <p>For any questions, concerns, or data-related requests, please contact:</p>
            <address className="not-italic mt-3 text-gray-600">
              <strong>Sajan Shah Foundation</strong><br />
              8 Deepawali Complex, Near Income Tax Cross Road<br />
              Ashram Road, Opp. Old High Court Road<br />
              Ahmedabad, Gujarat – 380009, India<br />
              Email: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline underline-offset-4">support.ind@sajanshah.com</a>
            </address>
          </Section>

          <Section title="18. Grievance Officer">
            <p>Grievance Officer — Sajan Shah Foundation</p>
            <p>Email: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline underline-offset-4">support.ind@sajanshah.com</a></p>
          </Section>

          <Section title="19. Acceptance of Policy">
            <p>By accessing or using our platforms, you confirm that you have read, understood, and agreed to this Privacy Policy.</p>
          </Section>

          {/* Signature */}
          <div className="pt-10 mt-10 border-t border-gray-200 flex flex-col items-end">
            <img src="/sir sign.png" alt="Authorised Signature" className="h-20 object-contain mb-2" />
            <p className="text-sm text-gray-500">Authorised Signatory</p>
            <p className="text-sm font-semibold text-gray-700">Sajan Shah Foundation</p>
          </div>

        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-1 mb-3">{title}</h2>
      {children}
      <div className="border-t border-dashed border-gray-100 pt-2"></div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1 pl-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c8a96e] flex-shrink-0"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
