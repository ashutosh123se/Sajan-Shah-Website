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

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Terms of Service, Privacy Policy &amp; Platform Use Agreement</h1>
          <p className="text-sm text-gray-400 mt-3">Last Updated: April 1, 2026</p>
        </div>
        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">

          <Section title="1. Introduction">
            <p>This Terms of Service, Privacy Policy, and Platform Use Agreement ("Agreement") governs your access to and use of all platforms, services, and initiatives operated by Sajan Shah Foundation ("Foundation", "we", "our", or "us").</p>
            <p className="mt-2">This includes, but is not limited to:</p>
            <BulletList items={['Official Website','Sajan Shah Mobile Application','AI Sajan Shah Platform','Events, Programs, Workshops, and Webinars','Books and Digital Content','Live to Inspire Charitable Trust','United First Initiative']} />
            <p className="mt-2">By accessing or using any of our services, you agree to be legally bound by this Agreement. If you do not agree, you must discontinue use immediately.</p>
          </Section>

          <Section title="2. Nature of Services">
            <p>Sajan Shah Foundation provides educational, motivational, and awareness-based services, including but not limited to:</p>
            <BulletList items={['Personal development programs and training','Live and virtual events','Digital and physical publications','AI-based informational tools','Social and community initiatives']} />
            <p className="mt-2">Activities conducted under Live to Inspire Charitable Trust and United First Initiative are aimed at social impact and community development, aligned with the United Nations Sustainable Development Goals (SDG 2030). All services are intended solely for educational and informational purposes.</p>
          </Section>

          <Section title="3. Privacy Policy">
            <SubSection title="3.1 Information We Collect">
              <p>We may collect the following information:</p>
              <BulletList items={['Name, email address, phone number','Device and usage data','Application usage behavior','AI interaction data']} />
            </SubSection>
            <SubSection title="3.2 Use of Information">
              <p>Your information may be used to:</p>
              <BulletList items={['Provide and improve services','Personalize user experience','Communicate updates, offers, and notifications','Conduct analytics and performance tracking']} />
            </SubSection>
            <SubSection title="3.3 AI Data Usage">
              <p>Interactions with AI platforms:</p>
              <BulletList items={['May be stored and analyzed','May be used to improve system performance','Are not guaranteed to be confidential']} />
            </SubSection>
            <SubSection title="3.4 Third-Party Services">
              <p>We may engage third-party providers for payment processing, webinar hosting, and analytics and communication tools. Such providers operate under their respective privacy policies.</p>
            </SubSection>
          </Section>

          <Section title="4. User Consent & Communication">
            <p>By submitting your details, you consent to receive emails, phone calls, and SMS/WhatsApp communications from Sajan Shah Foundation or its authorized representatives.</p>
            <p className="mt-2">You may opt out at any time through provided unsubscribe mechanisms or by contacting support.</p>
          </Section>

          <Section title="5. Mobile Application & AI Platform">
            <SubSection title="5.1 Application Use">
              <p>Users are required to provide accurate information. Accounts are personal and non-transferable.</p>
            </SubSection>
            <SubSection title="5.2 AI Disclaimer">
              <p>The AI Sajan Shah Platform provides educational and informational guidance only. It does not constitute:</p>
              <BulletList items={['Medical advice','Legal advice','Financial advice','Psychological or therapeutic services']} />
              <p className="mt-2">Users are solely responsible for decisions based on AI outputs.</p>
            </SubSection>
          </Section>

          <Section title="6. Events, Programs & Participation">
            <p>By participating in any event, program, or webinar, you agree that:</p>
            <BulletList items={['Sessions may be recorded','Your image, voice, or participation may be used for promotional purposes','Participation is voluntary']} />
            <p className="mt-2">The Foundation does not guarantee specific results or outcomes.</p>
          </Section>

          <Section title="7. Payments, Refunds & Cancellations">
            <p>All payments made for programs, events, or digital products are subject to terms communicated at the time of purchase. Unless explicitly stated otherwise:</p>
            <BulletList items={['Fees are non-refundable','No refunds will be issued for missed sessions or accessed digital content']} />
          </Section>

          <Section title="8. Intellectual Property">
            <p>All content available through our platforms, including text, videos, programs, books, AI outputs, logos, and branding is the exclusive property of Sajan Shah Foundation. This includes associated entities such as United First Initiative and Live to Inspire Charitable Trust. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
          </Section>

          <Section title="9. Community Guidelines">
            <p>Users agree not to engage in abusive or harmful behavior, share inappropriate or illegal content, or spam or misuse platform features. Violation may result in suspension or termination of access.</p>
          </Section>

          <Section title="10. Results Disclaimer">
            <p>Sajan Shah Foundation does not guarantee personal success, academic or professional outcomes, or financial or performance improvements. Results vary based on individual effort and implementation.</p>
          </Section>

          <Section title="11. Social Initiatives">
            <p>Programs under Live to Inspire Charitable Trust and United First Initiative are conducted for social awareness and impact. Participation does not guarantee measurable individual outcomes or financial or personal benefits.</p>
          </Section>

          <Section title="12. Payments & Subscriptions">
            <p>Where applicable, subscription services may auto-renew, users are responsible for managing cancellations, and pricing is subject to change without prior notice.</p>
          </Section>

          <Section title="13. Limitation of Liability">
            <p>To the fullest extent permitted by law, Sajan Shah Foundation shall not be liable for direct or indirect damages, loss of data, income, or opportunity, or outcomes resulting from use of services or AI systems.</p>
          </Section>

          <Section title="14. User Responsibilities">
            <p>You agree to use the platform lawfully and ethically, comply with all applicable laws, and not misuse or disrupt services.</p>
          </Section>

          <Section title="15. Governing Law & Jurisdiction">
            <p>This Agreement shall be governed by the laws of Ahmedabad, Gujarat, India. All disputes shall be subject to the exclusive jurisdiction of courts located in Ahmedabad.</p>
          </Section>

          <Section title="16. Modifications">
            <p>Sajan Shah Foundation reserves the right to update or modify this Agreement at any time. Changes shall be effective immediately upon posting.</p>
          </Section>

          <Section title="17. Termination">
            <p>We reserve the right to suspend or terminate access to services if Terms are violated or misuse or harmful activity is detected.</p>
          </Section>

          <Section title="18. Acceptance of Terms">
            <p>By accessing or using any service provided by Sajan Shah Foundation, you acknowledge that you have read, understood, and agreed to this Agreement.</p>
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
