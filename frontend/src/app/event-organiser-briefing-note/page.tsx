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

export default function EventOrganiserBriefingPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Event Organiser Briefing Note</h1>
          <p className="text-sm text-gray-400 mt-3 italic">Mandatory Terms to be Considered & Agreed Upon Before Booking</p>
          <p className="text-sm text-gray-400 mt-1">Last Updated: May 14, 2026</p>
        </div>

        <div className="mb-10 p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700 italic">
          <p>This briefing note outlines the standard operational, technical, branding, and commercial expectations for all organisers planning to book sessions conducted by Sajan Shah Foundation for Domestic and International Programs. Confirmation of booking implies acceptance of the following terms and conditions.</p>
        </div>

        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">
          <Section title="1. Booking Confirmation">
            <BulletList items={[
              'Event date shall be blocked only after written confirmation and receipt of agreed advance payment.',
              'Tentative discussions shall not be treated as confirmed bookings.',
              'Dates are allotted on a first-confirmed basis.'
            ]} />
          </Section>

          <Section title="2. Commercial Terms">
            <BulletList items={[
              '50% advance payment is mandatory to confirm the event.',
              'Remaining balance must be cleared before commencement of the session/program.',
              'Applicable GST, TDS, international transfer charges, currency conversion charges, and taxes shall be borne by the organiser unless agreed otherwise in writing.',
              'Delayed payments may impact future booking approvals.'
            ]} />
          </Section>

          <Section title="3. Cancellation & Rescheduling">
            <BulletList items={[
              'Advance payment is non-refundable.',
              'Rescheduling requests shall be subject to date availability.',
              'Any cancellation or postponement must be communicated officially in writing.',
              'Emergency situations shall be handled through mutual coordination.'
            ]} />
          </Section>

          <Section title="4. Domestic & International Travel, Stay & Hospitality">
            <p>The organiser shall arrange:</p>
            <BulletList items={[
              'Flight tickets as mutually agreed',
              'Visa support/documentation for international events where required',
              'Comfortable hotel accommodation',
              'Airport pickup and drop',
              'Local transportation',
              'Green room/basic refreshments before the session'
            ]} />
            <p className="mt-2">All travel and hospitality arrangements must be shared in advance with the coordination team.</p>
          </Section>

          <Section title="5. Venue & Technical Requirements">
            <p>Organiser must ensure:</p>
            <BulletList items={[
              'Professional sound system',
              'Cordless handheld microphone',
              'LED screen/projector setup (if required)',
              'Proper stage lighting',
              'Stable electricity backup',
              'Technical support staff available throughout the event',
              'Proper seating and audience management'
            ]} />
            <p className="mt-2 font-semibold text-gray-800 italic">Poor technical arrangements may directly affect session quality.</p>
          </Section>

          <Section title="6. Audience & Event Management">
            <BulletList items={[
              'Organiser shall be responsible for crowd discipline, venue management, and overall audience coordination.',
              'Safe and professional event environment is mandatory.',
              'Any serious disruption, unsafe condition, or misconduct may lead to pause or termination of the session if necessary.'
            ]} />
          </Section>

          <Section title="7. Promotion & Marketing Responsibility">
            <BulletList items={[
              'Organiser agrees to actively promote the event through available channels including social media, posters, banners, emailers, institution communication, and digital campaigns.',
              'Official creatives/logos shared by Sajan Shah Foundation should be used wherever possible.',
              'Any independently designed promotional material using Sajan Shah’s name/image must be approved before release.'
            ]} />
          </Section>

          <Section title="8. Branding & Visibility">
            <p>Organiser shall provide:</p>
            <BulletList items={[
              'Proper branding visibility on stage',
              'Correct name and designation in all promotions',
              'Stage backdrop/logo placement where applicable',
              'Professional event presentation standards'
            ]} />
          </Section>

          <Section title="9. Media, Photography & Recording Rights">
            <BulletList items={[
              'Photos and short video clips captured during the event may be used by Sajan Shah Foundation for branding and promotional purposes globally.',
              'Full session recording, broadcasting, resale, redistribution, or commercial usage requires prior written approval.',
              'Official media team of Sajan Shah Foundation should receive reasonable access for content capture.'
            ]} />
          </Section>

          <Section title="10. Content Ownership & Intellectual Property">
            <BulletList items={[
              'All session frameworks, activities, concepts, training models, and presentation content remain intellectual property of Sajan Shah Foundation.',
              'Unauthorized reproduction, redistribution, training reuse, or commercial adaptation is strictly prohibited.'
            ]} />
          </Section>

          <Section title="11. Event Inputs & Coordination">
            <p>Organiser must share the following minimum 5-7 days before the event:</p>
            <BulletList items={[
              'Audience profile',
              'Age group/category',
              'Expected audience strength',
              'Event objective',
              'Agenda flow',
              'Language preference',
              'Session expectations'
            ]} />
            <p className="mt-2">This helps customise the delivery effectively.</p>
          </Section>

          <Section title="12. Speaker Positioning & Exclusivity">
            <BulletList items={[
              'No conflicting motivational or keynote session should be scheduled simultaneously or immediately adjacent without prior discussion.',
              'Stage flow and positioning should maintain professional session value.'
            ]} />
          </Section>

          <Section title="13. Legal & Compliance Responsibility">
            <BulletList items={[
              'Organiser shall obtain all venue permissions, operational approvals, insurance requirements, and legal compliances required for conducting the event.',
              'For international programs, organiser shall ensure compliance with local country/event regulations.',
              'Sajan Shah Foundation shall not be held liable for venue-side operational or legal issues.'
            ]} />
          </Section>

          <Section title="14. Force Majeure">
            <p>Neither party shall be held responsible for delays or cancellations caused due to:</p>
            <BulletList items={[
              'Natural disasters',
              'Government restrictions',
              'Public emergencies',
              'Pandemic situations',
              'Political instability',
              'Visa/travel restrictions',
              'Strikes or unforeseen circumstances beyond control'
            ]} />
          </Section>

          <Section title="15. Final Acceptance">
            <p>Proceeding with booking confirmation, advance payment, or official event communication shall be treated as acceptance of all terms mentioned in this briefing note.</p>
          </Section>

          <div className="pt-10 mt-10 border-t border-gray-200">
            <div className="bg-[#fafaf8] p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Official Coordination</h3>
              <div className="space-y-1 text-gray-700">
                <p className="font-bold">Sajan Shah Foundation</p>
                <p className="text-sm">Professional Motivational, Educational & International Event Programs Division</p>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col items-end">
            <img src="/sir sign.png" alt="Authorised Signature" className="h-20 object-contain mb-2" />
            <p className="text-sm text-gray-500">Authorised Signatory</p>
            <p className="text-sm font-semibold text-gray-700">Sajan Shah Foundation</p>
          </div>
        </div>
      </div>
    </main>
  );
}
