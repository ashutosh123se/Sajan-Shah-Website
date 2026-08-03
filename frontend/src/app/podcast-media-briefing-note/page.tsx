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

export default function PodcastMediaBriefingPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] pt-40 pb-20 px-4 relative">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.04]">
        <img src="/sir sign.png" alt="" className="w-[600px] rotate-[-20deg] select-none" />
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-16">
        <div className="text-center mb-10 pb-6 border-b border-[#c8a96e]">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">Sajan Shah Foundation</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase">Podcast & Media Interview Briefing Note</h1>
          <p className="text-sm text-gray-400 mt-3 italic">Mandatory Terms to be Considered & Agreed Upon Before Scheduling</p>
          <p className="text-sm text-gray-400 mt-1">Last Updated: May 14, 2026</p>
        </div>

        <div className="mb-10 p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700 italic">
          <p>This briefing note outlines the standard operational, branding, recording, and commercial expectations for all podcast appearances, media interviews, digital collaborations, studio shoots, online broadcasts, and public conversation formats involving Sajan Shah Foundation. Proceeding with scheduling, confirmation, or public announcement shall be treated as acceptance of the following terms.</p>
        </div>

        <div className="space-y-8 text-gray-700 text-[15px] leading-[1.9]">
          <Section title="1. Scheduling & Confirmation">
            <BulletList items={[
              'Interview/podcast dates shall be confirmed only after mutual written confirmation.',
              'Tentative discussions shall not be treated as final commitments.',
              'Any changes in schedule must be communicated in advance.'
            ]} />
          </Section>

          <Section title="2. Format & Session Details">
            <p>The organising/interview team must share:</p>
            <BulletList items={[
              'Podcast/interview format',
              'Expected duration',
              'Platform/channel details',
              'Discussion topics',
              'Audience demographics',
              'Recording format (audio/video/live)',
              'Number of speakers/panelists',
              'Language preference'
            ]} />
            <p className="mt-2 text-sm italic">Minimum details should preferably be shared 5–7 days prior.</p>
          </Section>

          <Section title="3. Recording & Usage Rights">
            <BulletList items={[
              'Recorded content may be used by both parties for promotional and branding purposes unless otherwise agreed.',
              'Full content ownership and commercial redistribution rights must be discussed separately if applicable.',
              'Clips, reels, shorts, snippets, thumbnails, and promotional edits may be used on digital platforms by Sajan Shah Foundation.'
            ]} />
          </Section>

          <Section title="4. Editing & Representation">
            <BulletList items={[
              'Content should not be edited, clipped, or presented in a misleading, defamatory, or reputation-damaging manner.',
              'Final published content should maintain professional and contextual accuracy.'
            ]} />
          </Section>

          <Section title="5. Branding & Credit">
            <p>Organiser/interview platform shall ensure:</p>
            <BulletList items={[
              'Proper speaker name mention',
              'Correct designation/title',
              'Proper tagging on social media where applicable',
              'Brand visibility in descriptions, posters, and thumbnails'
            ]} />
          </Section>

          <Section title="6. Technical & Production Standards">
            <p>Organiser/platform must ensure:</p>
            <BulletList items={[
              'Professional audio quality',
              'Stable internet connection for virtual sessions',
              'Proper lighting and recording setup',
              'Functional backup recording arrangements where possible'
            ]} />
            <p className="mt-2 font-semibold text-gray-800 italic">Poor technical quality may affect recording continuity.</p>
          </Section>

          <Section title="7. Media Access & Promotion">
            <BulletList items={[
              'Sajan Shah Foundation may share approved snippets, behind-the-scenes footage, photos, or promotional creatives from the interaction.',
              'Organisers are encouraged to collaborate on cross-platform promotion for better reach and engagement.'
            ]} />
          </Section>

          <Section title="8. Travel & Hospitality (For Physical Shoots/Interviews)">
            <p>For studio or physical appearances, organiser shall arrange:</p>
            <BulletList items={[
              'Flight tickets as mutually agreed',
              'Comfortable hotel accommodation (if required)',
              'Airport pickup and drop',
              'Local transportation',
              'Green room/basic refreshments'
            ]} />
            <div className="mt-3">
              <p className="font-bold">For international interviews/programs:</p>
              <BulletList items={[
                'Visa support/documentation where applicable',
                'Compliance with local recording and media regulations'
              ]} />
            </div>
          </Section>

          <Section title="9. Exclusivity & Conflict Positioning">
            <BulletList items={[
              'Any competing or conflicting positioning involving controversial comparisons, public debates, or misrepresentation must be disclosed in advance.',
              'Sajan Shah Foundation reserves the right to decline participation in formats that may negatively impact brand positioning.'
            ]} />
          </Section>

          <Section title="10. Intellectual Property">
            <BulletList items={[
              'Personal frameworks, educational concepts, training structures, and proprietary methodologies shared during the interview remain intellectual property of Sajan Shah Foundation.',
              'Unauthorized commercial reuse, training adaptation, or content resale is prohibited.'
            ]} />
          </Section>

          <Section title="11. Cancellation & Rescheduling">
            <BulletList items={[
              'Any cancellation or rescheduling request should be informed officially at the earliest possible stage.',
              'Repeated last-minute changes may affect future collaboration approvals.'
            ]} />
          </Section>

          <Section title="12. Legal & Compliance">
            <BulletList items={[
              'Organiser/platform shall ensure compliance with applicable media, broadcasting, copyright, and platform regulations.',
              'Sajan Shah Foundation shall not be liable for third-party copyright violations or platform policy issues caused by organiser-side handling.'
            ]} />
          </Section>

          <Section title="13. Force Majeure">
            <p>Neither party shall be held responsible for delays, interruptions, or cancellations caused due to:</p>
            <BulletList items={[
              'Technical failures',
              'Government restrictions',
              'Public emergencies',
              'Internet outages',
              'Natural disasters',
              'Political restrictions',
              'Unforeseen operational issues'
            ]} />
          </Section>

          <Section title="14. Final Acceptance">
            <p>Proceeding with scheduling, recording, promotion, or public announcement shall be considered acceptance of all terms mentioned in this briefing note.</p>
          </Section>

          <div className="pt-10 mt-10 border-t border-gray-200">
            <div className="bg-[#fafaf8] p-6 rounded-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider">Official Coordination</h3>
              <div className="space-y-1 text-gray-700">
                <p className="font-bold text-lg">Sajan Shah Foundation</p>
                <p className="text-sm text-[#f26522] font-bold uppercase tracking-widest">Podcast, Media & Digital Communications Division</p>
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
