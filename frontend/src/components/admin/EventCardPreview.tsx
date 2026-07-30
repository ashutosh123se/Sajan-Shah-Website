import { MediaImage } from '@/components/common/MediaImage';
import { Calendar as CalendarIcon, MapPin, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

export interface EventPreviewData {
  title: string;
  eventDate: string;
  city?: string;
  venue?: string;
  eventType?: string;
  isOnline?: boolean;
  isFree: boolean;
  ticketPrice?: string | number;
  thumbnailUrl?: string;
  isActive?: boolean;
  buttonUrl?: string;
}

const getCategoryLabel = (eventType?: string) => {
  const dbType = (eventType || '').toLowerCase();
  if (dbType.includes('school')) return 'School';
  if (dbType.includes('corporate')) return 'Corporate';
  if (dbType.includes('private') || dbType.includes('retreat')) return 'Private';
  return 'Public';
};

const getColorClass = (eventType?: string) => {
  const cat = getCategoryLabel(eventType);
  if (cat === 'School') return 'bg-yellow-400';
  if (cat === 'Private') return 'bg-blue-500';
  if (cat === 'Corporate') return 'bg-purple-500';
  return 'bg-brand-orange';
};

const formatPrice = (isFree: boolean, price?: string | number) => {
  if (isFree) return 'FREE';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  if (!num) return 'FREE';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

interface EventCardPreviewProps {
  event: EventPreviewData;
  compact?: boolean;
}

export function EventCardPreview({ event, compact = false }: EventCardPreviewProps) {
  const formatLabel = event.isOnline || (event.city || '').toLowerCase() === 'online' ? 'Online' : 'Offline';
  const category = getCategoryLabel(event.eventType);
  const colorClass = getColorClass(event.eventType);
  const date = event.eventDate ? new Date(event.eventDate) : null;
  const city = event.isOnline ? 'Online' : (event.city || 'Mumbai');
  const poster = event.thumbnailUrl || '/images/placeholder.jpg';

  if (compact) {
    return (
      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
        <div className="relative h-36 bg-zinc-900">
          <MediaImage src={poster} alt={event.title || 'Event preview'} className="w-full h-full object-cover" />
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${event.isFree ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#f26522]/20 text-[#f26522] border border-[#f26522]/30'}`}>
              {formatPrice(event.isFree, event.ticketPrice)}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className={`w-2.5 h-2.5 rounded-full mr-2 ${colorClass}`} />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{formatLabel} - {category}</span>
          </div>
          <h4 className="text-sm font-bold text-white line-clamp-2 mb-2">{event.title || 'Event Title'}</h4>
          {date && (
            <p className="text-xs text-gray-400">{format(date, 'dd MMM yyyy, HH:mm')}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/10 p-6 rounded-xl">
      {event.thumbnailUrl && (
        <div className="mb-4 rounded-lg overflow-hidden h-40">
          <MediaImage src={poster} alt={event.title || 'Event preview'} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full mr-3 ${colorClass}`} />
          <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{formatLabel} - {category}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${event.isFree ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#f26522]/20 text-[#f26522] border border-[#f26522]/30'}`}>
          {formatPrice(event.isFree, event.ticketPrice)}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-4 line-clamp-2 text-white">{event.title || 'Event Title'}</h3>
      <div className="space-y-2 mb-6 text-sm text-gray-300">
        <div className="flex items-center">
          <CalendarIcon className="w-4 h-4 mr-3 text-[#f26522]" />
          {date ? format(date, 'dd MMM yyyy, HH:mm') : 'Select date & time'}
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-3 text-[#f26522]" />
          {city}{event.venue ? ` · ${event.venue}` : ''}
        </div>
        <div className="flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-3 text-[#f26522]" />
          {event.isActive === false ? 'Closed' : 'Open for Registration'}
        </div>
      </div>
      <div className="w-full bg-white text-black text-center py-2.5 rounded-lg text-sm font-bold">
        View Details
      </div>
    </div>
  );
}
