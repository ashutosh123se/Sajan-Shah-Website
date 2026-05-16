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

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Refund &amp; Replacement Policy</h1>
          <p className="text-sm text-gray-400 mt-3">Last Updated: April 1, 2026</p>
        </div>
        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">

          <Section title="1. Introduction">
            <p>At Sajan Shah Foundation, we value the trust you place in us. We are committed to delivering high-quality programs, products, and experiences. This policy ensures fairness, transparency, and clarity for all users. By purchasing or registering for any offering, you agree to the terms outlined below.</p>
          </Section>

          <Section title="2. Scope of Policy">
            <p>This policy applies to all offerings, including:</p>
            <BulletList items={['Workshops, Events, and Webinars','Training Programs and Courses','Digital Products and Content','Physical Products (Books, Materials, etc.)','Services delivered by Sajan Shah or authorized trainers']} />
          </Section>

          <Section title="3. Refund Policy">
            <div className="space-y-4 mt-2">
              <div><h3 className="font-semibold text-gray-800 mb-1">3.1 Low-Value Workshops (₹500 or Below)</h3>
                <p>No refunds will be provided. Alternative options:</p>
                <BulletList items={['Access to next session (subject to availability)','Recording access (if applicable)']} /></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.2 Full Payment – Satisfaction Based Review</h3>
                <p>Refund requests may be submitted within the defined timeline. Each case will be reviewed individually. Approved refunds will be processed accordingly. If a refund is granted, re-enrollment in the same program may not be permitted.</p></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.3 Token Payments / Partial Payments</h3>
                <BulletList items={['Refund requests must be made within 48 hours of payment','After 48 hours, token amounts are non-refundable','Failure to complete remaining payment may result in cancellation without refund']} /></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.4 Digital Products (IMPORTANT)</h3>
                <p>No refunds will be provided once:</p>
                <BulletList items={['The product has been accessed','The content has been viewed or downloaded','Login credentials have been issued']} /></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.5 No-Show Policy</h3>
                <p>If a participant fails to attend without prior notice or does not inform within required timeline → No refund or transfer will be provided.</p></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.6 Inability to Attend (Advance Notice)</h3>
                <p>If informed at least 48 hours prior:</p>
                <BulletList items={['One-time transfer to next session allowed','Seat transfer to another participant allowed']} />
                <p className="mt-1">Conditions: Valid only once. Must be used within a reasonable timeframe.</p></div>
              <div><h3 className="font-semibold text-gray-800 mb-1">3.7 Cancellation by Foundation</h3>
                <p>If Sajan Shah Foundation cancels or reschedules:</p>
                <BulletList items={['Full refund will be provided, OR','Transfer to next available session']} /></div>
            </div>
          </Section>

          <Section title="4. General Conditions">
            <p>Refund requests must be sent to: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline">support.ind@sajanshah.com</a></p>
            <p className="mt-2">Include:</p>
            <BulletList items={['Payment proof','Reason for request','Requests must be raised within 7 days of purchase or event date (whichever is earlier)']} />
          </Section>

          <Section title="5. Medical & Exception Cases">
            <p>In genuine medical emergencies, valid documentation must be provided. Requests will be reviewed on a case-by-case basis.</p>
          </Section>

          <Section title="6. Fair Usage Policy">
            <p>To maintain fairness, misuse of refund policy may lead to rejection. Repeated misuse may result in restriction from future programs.</p>
          </Section>

          <Section title="7. Refund Processing">
            <BulletList items={['Approved refunds processed within 7–10 working days','Refund mode: Original payment method, or Bank transfer','Processing time may vary based on banking systems']} />
          </Section>

          <Section title="8. Payment Terms & Duplicate Payments">
            <BulletList items={['Duplicate payments (if any) will be refunded after verification','Payment gateway charges may be deducted where applicable']} />
          </Section>

          <Section title="9. Replacement Policy (Physical Products)">
            <p><strong>Eligibility:</strong> Replacement is applicable only if the product is defective, damaged, or incorrect, and the request is made within 48 hours of delivery.</p>
            <p className="mt-2"><strong>Conditions:</strong> Product must be unused, in original packaging, with invoice.</p>
            <div className="mt-3">
              <p><strong>Return Address:</strong></p>
              <address className="not-italic mt-1 text-gray-600">Sajan Shah Foundation<br />8 Deepawali Complex, Near Income Tax Cross Road<br />Ashram Road, Opp. Old High Court Road<br />Ahmedabad, Gujarat – 380009, India</address>
            </div>
            <p className="mt-3"><strong>Shipping:</strong> If defect/damage confirmed → we cover shipping. Otherwise → customer may bear return cost.</p>
          </Section>

          <Section title="10. Force Majeure">
            <p>Sajan Shah Foundation shall not be held liable for failure or delay due to events beyond control, including natural disasters, technical failures, government restrictions, or network disruptions.</p>
          </Section>

          <Section title="11. Pricing Policy">
            <BulletList items={['Prices may change at any time without prior notice','Changes will not affect completed purchases']} />
          </Section>

          <Section title="12. Access Termination">
            <p>Access to programs or platforms may be revoked if Terms are violated or misconduct or misuse is detected. No refund will be provided in such cases.</p>
          </Section>

          <Section title="13. Legal Jurisdiction">
            <p>This policy is governed by the laws of Ahmedabad, Gujarat, India. All disputes fall under Ahmedabad jurisdiction.</p>
          </Section>

          <Section title="14. Policy Updates">
            <p>Sajan Shah Foundation reserves the right to update this policy at any time. The latest version will always be available on official platforms.</p>
          </Section>

          <Section title="15. Contact & Support">
            <p>For all refund, replacement, or support queries:</p>
            <address className="not-italic mt-2 text-gray-600"><strong>Sajan Shah Foundation</strong><br />Email: <a href="mailto:support.ind@sajanshah.com" className="text-[#c8a96e] underline">support.ind@sajanshah.com</a></address>
          </Section>

          <Section title="16. Final Note">
            <p>We are committed to fairness, transparency, and delivering value in every interaction. Thank you for trusting Sajan Shah Foundation.</p>
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
