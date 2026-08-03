'use client';
import React from 'react';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-1 mb-3">{title}</h2>
      {children}
      <div className="border-t border-dashed border-gray-100 pt-2"></div>
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

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Website Terms and Conditions of Use</h1>
          <p className="text-sm text-gray-400 mt-3">Last Updated: April 1, 2026</p>
        </div>
        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">

          <Section title="1. Acceptance of Terms">
            <p>By accessing this Website, accessible from https://sajanshah.com/ (and associated platforms), you agree to be bound by these Terms and Conditions of Use and all applicable laws and regulations.</p>
            <p className="mt-2">If you do not agree with any of these terms, you are prohibited from using this Website or any related services.</p>
          </Section>

          <Section title="2. Scope of Services">
            <p>These Terms apply to all services provided by Sajan Shah Foundation, including:</p>
            <BulletList items={['Website','Sajan Shah Mobile Application','AI Sajan Shah Platform','Events, Webinars, and Programs','Books and Digital Products','Live to Inspire Charitable Trust','United First Initiative']} />
          </Section>

          <Section title="3. Use License">
            <p>Permission is granted to temporarily access and download materials for personal, non-commercial use only.</p>
            <p className="mt-2">Under this license, you may not:</p>
            <BulletList items={['Modify or copy materials','Use materials for commercial purposes','Reverse engineer any software','Remove proprietary notices','Mirror content on other platforms']} />
            <p className="mt-2">Violation of these terms will result in termination of access.</p>
          </Section>

          <Section title="4. Mobile Application Usage">
            <p>Users of the Sajan Shah Mobile Application agree that:</p>
            <BulletList items={['Account information must be accurate','Accounts are personal and non-transferable','Unauthorized use or sharing of accounts is prohibited','Subscription services (if applicable) may auto-renew unless cancelled']} />
          </Section>

          <Section title="5. AI Sajan Shah Platform Disclaimer">
            <p>The AI Sajan Shah platform provides educational and informational guidance only. It does not provide:</p>
            <BulletList items={['Medical advice','Legal advice','Financial advice','Psychological or therapeutic services']} />
            <p className="mt-2">Users acknowledge that:</p>
            <BulletList items={['AI responses are automated and may not be accurate','Decisions based on AI outputs are at the user\'s own risk','Sensitive or confidential information should not be shared']} />
          </Section>

          <Section title="6. Payments, Refunds & Purchases">
            <p>All payments for programs, events, and products are subject to terms communicated at the time of purchase.</p>
            <BulletList items={['Fees are generally non-refundable, unless explicitly stated','No refunds for accessed digital content or missed sessions']} />
            <p className="mt-2">Please refer to our Refund Policy for detailed terms.</p>
          </Section>

          <Section title="7. User-Generated Content">
            <p>By submitting any content (including testimonials, feedback, or media), you grant Sajan Shah Foundation a non-exclusive, royalty-free right to use, display, publish, and distribute such content for promotional and business purposes.</p>
          </Section>

          <Section title="8. Media Consent">
            <p>By attending events, programs, or webinars, you consent to photography and video recording, and use of your image, voice, or participation in marketing, media, or promotional content.</p>
          </Section>

          <Section title="9. Disclaimer">
            <p>All materials and services are provided on an &quot;as is&quot; basis. Sajan Shah Foundation makes no warranties regarding accuracy or completeness, reliability of content, or guaranteed results or outcomes.</p>
          </Section>

          <Section title="10. Limitation of Liability">
            <p>Sajan Shah Foundation shall not be liable for any direct or indirect damages, loss of data, income, or opportunity, or decisions based on content or AI outputs.</p>
          </Section>

          <Section title="11. User Conduct">
            <p>Users agree not to engage in illegal activities, disrupt services, misuse content or platforms, or harass or harm other users. Violation may result in suspension or termination.</p>
          </Section>

          <Section title="12. Termination of Access">
            <p>We reserve the right to suspend or terminate access to our platforms at any time if these Terms are violated or misuse or abuse is detected.</p>
          </Section>

          <Section title="13. Intellectual Property Rights">
            <p>All content and branding are owned by Sajan Shah Foundation, including Sajan Shah App, AI Sajan Shah, United First, and Live to Inspire. Unauthorized use is strictly prohibited.</p>
          </Section>

          <Section title="14. Third-Party Links">
            <p>We are not responsible for content or practices of third-party websites linked from our platform. Use of such websites is at your own risk.</p>
          </Section>

          <Section title="15. Privacy & Data Usage">
            <p>Your use of this Website involves data collection and usage as described in our Privacy Policy.</p>
          </Section>

          <Section title="16. Age Restriction">
            <p>Users must be at least 13 years of age or have parental/guardian consent to use our services.</p>
          </Section>

          <Section title="17. Force Majeure">
            <p>Sajan Shah Foundation shall not be held liable for failure or delay in performance due to events beyond reasonable control, including natural disasters, technical failures, government actions, or network disruptions.</p>
          </Section>

          <Section title="18. Governing Law & Jurisdiction">
            <p>These Terms shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes shall be subject to the exclusive jurisdiction of courts in Ahmedabad.</p>
          </Section>

          <Section title="19. Modifications to Terms">
            <p>We reserve the right to modify these Terms at any time. Continued use of the Website constitutes acceptance of updated Terms.</p>
          </Section>

          <Section title="20. Communication Policy">
            <p>By registering or providing your details, you agree to receive emails, SMS/WhatsApp messages, and calls for updates, promotions, and service-related communication. You may opt out at any time.</p>
          </Section>

          <Section title="21. Contact Information">
            <address className="not-italic text-gray-600">
              <strong>Sajan Shah Foundation</strong><br />
              8 Deepawali Complex, Near Income Tax Cross Road<br />
              Ashram Road, Opp. Old High Court Road<br />
              Ahmedabad, Gujarat – 380009, India<br />
              Email: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline underline-offset-4">support.ind@sajanshah.com</a>
            </address>
          </Section>

          <Section title="22. Acceptance of Terms">
            <p>By accessing or using our platforms, you confirm that you have read, understood, and agreed to these Terms and Conditions.</p>
          </Section>

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
