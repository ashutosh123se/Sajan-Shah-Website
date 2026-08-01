import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Calendar as CalendarIcon, MapPin, CheckCircle2, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, addMonths, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { SajanEvent, currentDate } from './eventsData';
import { MediaImage } from '@/components/common/MediaImage';

interface EventsCalendarProps {
  events: SajanEvent[];
  allEvents: SajanEvent[];
}

type TimeFilter = 'all' | 'upcoming' | 'past';

export default function EventsCalendar({ events, allEvents }: EventsCalendarProps) {
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');

  const [cityFilter, setCityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formatFilter, setFormatFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  // Calendar source: upcoming + past (so months can show history)
  const calendarEvents = useMemo(() => {
    return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  const filteredEvents = useMemo(() => {
    return calendarEvents.filter((e) => {
      if (timeFilter === 'upcoming' && e.isPast) return false;
      if (timeFilter === 'past' && !e.isPast) return false;
      if (cityFilter && e.city !== cityFilter) return false;
      if (categoryFilter && e.category !== categoryFilter) return false;
      if (formatFilter && e.format !== formatFilter) return false;
      if (availabilityFilter && e.availability !== availabilityFilter) return false;
      return true;
    });
  }, [calendarEvents, timeFilter, cityFilter, categoryFilter, formatFilter, availabilityFilter]);

  const cities = useMemo(
    () => Array.from(new Set(calendarEvents.map((e) => e.city).filter(Boolean))).sort(),
    [calendarEvents]
  );

  const formatEventPrice = (event: SajanEvent) => {
    if (event.isFree === true || event.price === 0) return 'FREE';
    if (typeof event.price === 'number' && event.price > 0) {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(event.price);
    }
    return event.isFree === false ? 'Paid' : 'FREE';
  };

  const [startMonthOffset, setStartMonthOffset] = useState(0);

  const scrollToEventCard = (eventId: string, isWebinar?: boolean, isPast?: boolean) => {
    const inList = filteredEvents.some((e) => String(e.id) === eventId);

    if (viewMode === 'month' && inList) {
      setViewMode('list');
      if (isPast) setTimeFilter((prev) => (prev === 'upcoming' ? 'all' : prev));
      setTimeout(() => {
        const el = document.getElementById(`event-card-${eventId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
          setTimeout(() => {
            el.classList.remove('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
          }, 2000);
        }
      }, 300);
      return;
    }

    const el = document.getElementById(`event-card-${eventId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
      }, 2000);
    } else if (isWebinar) {
      document.getElementById('webinars')?.scrollIntoView({ behavior: 'smooth' });
    } else if (isPast) {
      document.getElementById('past-events')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#event-card-')) {
        const eventId = hash.replace('#event-card-', '');
        const event = allEvents.find((e) => String(e.id) === eventId);

        if (event) {
          setViewMode('list');
          if (event.isPast) setTimeFilter('all');
        }

        setTimeout(() => {
          const el = document.getElementById(`event-card-${eventId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
            setTimeout(() => {
              el.classList.remove('ring-4', 'ring-[#f26522]', 'ring-offset-4', 'ring-offset-black', 'scale-[1.02]');
            }, 2000);
          } else if (event?.isWebinar) {
            document.getElementById('webinars')?.scrollIntoView({ behavior: 'smooth' });
          } else if (event?.isPast) {
            document.getElementById('past-events')?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [allEvents]);

  const renderMonthCalendar = (offset: number) => {
    const monthDate = addMonths(currentDate, offset);
    const startDate = startOfMonth(monthDate);
    const endDate = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const startDay = getDay(startDate);

    const monthEvents = filteredEvents.filter(
      (e) =>
        isSameMonth(e.date, monthDate) ||
        (e.endDate && isSameMonth(e.endDate, monthDate)) ||
        (e.endDate && e.date < startDate && e.endDate > endDate)
    );

    const isPastMonth = endDate.getTime() < startOfDay(currentDate).getTime();

    return (
      <div className="bg-[#111] p-6 rounded-xl border border-white/5 min-w-[320px] flex-shrink-0 flex flex-col">
        <h3 className="text-center font-bold text-lg mb-1">{format(monthDate, 'MMMM yyyy')}</h3>
        <p className={`text-center text-[10px] uppercase tracking-widest mb-4 ${isPastMonth ? 'text-zinc-500' : 'text-transparent'}`}>
          {isPastMonth ? 'Past month' : 'Current'}
        </p>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-bold mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-6 flex-grow">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}
          {days.map((day) => {
            const dayEvents = monthEvents.filter((e) => {
              if (e.endDate) {
                return isWithinInterval(day, { start: startOfDay(e.date), end: endOfDay(e.endDate) });
              }
              return isSameDay(e.date, day);
            });

            const hasEvent = dayEvents.length > 0;
            const allPast = hasEvent && dayEvents.every((e) => e.isPast);
            const primaryColor = hasEvent ? dayEvents[0].colorCode : '';

            return (
              <button
                key={day.toString()}
                onClick={() => {
                  if (hasEvent) {
                    scrollToEventCard(dayEvents[0].id, dayEvents[0].isWebinar, dayEvents[0].isPast);
                  }
                }}
                disabled={!hasEvent}
                className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm transition-all border-none outline-none ${
                  hasEvent
                    ? `${primaryColor} font-bold cursor-pointer hover:scale-110 active:scale-95 shadow-md ${allPast ? 'opacity-60' : ''}`
                    : 'text-zinc-600 bg-transparent cursor-default'
                }`}
                title={hasEvent ? dayEvents.map((e) => `${e.title}${e.isPast ? ' (Past)' : ''}`).join(', ') : undefined}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-4 pt-4 border-t border-white/10">
          {monthEvents.length === 0 ? (
            <div className="text-gray-500 text-center text-sm italic py-4">No events this month</div>
          ) : (
            monthEvents.map((event) => (
              <div key={event.id} className={`flex flex-col ${event.isPast ? 'opacity-80' : ''}`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-bold tracking-tight">
                    {format(event.date, 'd MMM, HH:mm')}
                    {event.endDate ? ` - ${format(event.endDate, 'd MMM, HH:mm')}` : ''}
                  </span>
                  {event.isPast && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                      Past
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-300 mb-2 truncate" title={event.title}>
                  {event.title}
                </span>
                <div className="flex items-center text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-3">
                  <div className={`w-2 h-2 rounded-full mr-2 ${event.colorCode.split(' ')[0]}`}></div>
                  {event.format.toUpperCase()}: {event.city.toUpperCase()}
                </div>
                <Button
                  onClick={() => scrollToEventCard(event.id, event.isWebinar, event.isPast)}
                  className="w-full rounded-full bg-white text-black hover:bg-brand-orange hover:text-white transition-all text-xs font-bold py-2"
                >
                  View event
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div id="events-calendar-section">
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex flex-col w-full lg:w-64 space-y-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-6 py-3 rounded-full text-left font-bold transition-all ${viewMode === 'month' ? 'bg-white text-black' : 'bg-[#111] text-gray-400 hover:bg-white/10'}`}
            >
              Month view
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-full text-left font-bold transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'bg-[#111] text-gray-400 hover:bg-white/10'}`}
            >
              Event View
            </button>
          </div>

          <div className="flex flex-wrap gap-3 flex-1">
            <div className="px-4 py-2 rounded-full border border-white/20 text-sm font-bold hover:bg-white/10 cursor-pointer">All</div>
            {Array.from(new Set(allEvents.map((e) => e.title))).slice(0, 6).map((title, idx) => {
              const event = allEvents.find((e) => e.title === title);
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (event) {
                      scrollToEventCard(event.id, event.isWebinar, event.isPast);
                    }
                  }}
                  className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 cursor-pointer flex items-center"
                >
                  <span className={`w-2 h-2 rounded-full mr-2 ${event?.colorCode.split(' ')[0]}`}></span>
                  <span className="truncate max-w-[200px]">{title}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-8 border-t border-white/5">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-orange"
          >
            <option value="all">All Dates (Upcoming + Past)</option>
            <option value="upcoming">Upcoming only</option>
            <option value="past">Past only</option>
          </select>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-orange">
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-orange">
            <option value="">All Event Types</option>
            <option value="School">School</option>
            <option value="Corporate">Corporate</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <select value={formatFilter} onChange={(e) => setFormatFilter(e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-orange">
            <option value="">All Formats</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
          <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand-orange">
            <option value="">All Availabilities</option>
            <option value="Open for Registration">Open for Registration</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </section>

      <section className="py-12 pl-4 md:pl-8 max-w-[1400px] mx-auto overflow-hidden">
        {viewMode === 'month' ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-6 pr-4 md:pr-8">
              <button
                type="button"
                onClick={() => setStartMonthOffset((o) => o - 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/10 text-sm font-bold text-white hover:border-[#f26522] hover:text-[#f26522] transition-colors"
              >
                <ChevronLeft size={16} /> Earlier months
              </button>
              <button
                type="button"
                onClick={() => setStartMonthOffset(0)}
                className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                Jump to today
              </button>
              <button
                type="button"
                onClick={() => setStartMonthOffset((o) => o + 1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/10 text-sm font-bold text-white hover:border-[#f26522] hover:text-[#f26522] transition-colors"
              >
                Later months <ChevronRight size={16} />
              </button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 pr-8 snap-x" style={{ scrollbarWidth: 'none' }}>
              {renderMonthCalendar(startMonthOffset)}
              {renderMonthCalendar(startMonthOffset + 1)}
              {renderMonthCalendar(startMonthOffset + 2)}
              {renderMonthCalendar(startMonthOffset + 3)}
            </div>
          </>
        ) : (
          <div className="pr-4 md:pr-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500">No events found matching filters.</div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  id={`event-card-${event.id}`}
                  className={`bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-brand-orange transition-all duration-300 ${event.isPast ? 'opacity-90' : ''}`}
                >
                  {event.thumbnail && (
                    <div className="h-44 overflow-hidden relative">
                      <MediaImage src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
                      {event.isPast && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/80 text-zinc-300 border border-white/20">
                          Past event
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${event.colorCode.split(' ')[0]}`}></div>
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {event.format} - {event.category}
                        </span>
                      </div>
                      {!event.isPast && (
                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            formatEventPrice(event) === 'FREE'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30'
                          }`}
                        >
                          {formatEventPrice(event)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-4 line-clamp-2">{event.title}</h3>
                    <div className="space-y-2 mb-6 text-sm text-gray-300">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-3 text-brand-orange" />{' '}
                        {format(event.date, 'dd MMM yyyy, HH:mm')}{' '}
                        {event.endDate && `- ${format(event.endDate, 'dd MMM yyyy, HH:mm')}`}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-brand-orange" /> {event.city}
                      </div>
                      {!event.isPast && (
                        <>
                          <div className="flex items-center">
                            <IndianRupee className="w-4 h-4 mr-3 text-brand-orange" /> {formatEventPrice(event)}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-3 text-brand-orange" /> {event.availability}
                          </div>
                        </>
                      )}
                    </div>
                    {event.isPast ? (
                      <Button
                        onClick={() => document.getElementById('past-events')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10"
                      >
                        View in Past Events
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          if (event.buttonUrl) {
                            window.open(event.buttonUrl, '_blank');
                          } else {
                            document.getElementById('book-sajan')?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="w-full bg-white text-black hover:bg-brand-orange hover:text-white"
                      >
                        {formatEventPrice(event) === 'FREE' ? 'Register Free' : `Register · ${formatEventPrice(event)}`}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}
