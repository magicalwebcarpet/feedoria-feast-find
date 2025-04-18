
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/shared/SearchInput';
import EventCard from '@/components/shared/EventCard';
import MapView from '@/components/shared/MapView';
import CategoryFilter from '@/components/shared/CategoryFilter';
import { events, categories } from '@/lib/data';

const BookingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    filterEvents();
  }, [searchQuery, activeCategory]);

  const filterEvents = () => {
    let filtered = [...events];
    
    if (searchQuery) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    setFilteredEvents(filtered);
  };

  const mapLocations = filteredEvents.map(event => ({
    id: event.id,
    name: event.title,
    lat: event.lat,
    lng: event.lng,
    type: 'event' as const
  }));

  return (
    <MainLayout>
      <div className="py-6">
        <h1 className="font-bold text-2xl text-center mb-6">Chef Events</h1>
        
        <SearchInput 
          placeholder="Find cooking events..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />
        
        <CategoryFilter
          categories={categories.events}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        
        <div className="mt-6">
          <MapView 
            locations={mapLocations} 
            onMarkerClick={(location) => setSelectedEvent(location.id)}
            initialViewState={{
              latitude: 37.7749,
              longitude: -122.4194,
              zoom: 12
            }}
          />
        </div>
        
        <h2 className="font-semibold text-xl mt-6 mb-4">Upcoming Events</h2>
        
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <div key={event.id} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <EventCard
                id={event.id}
                title={event.title}
                chef={event.chef}
                price={event.price}
                image={event.image}
                date={event.date}
                location={event.location}
                duration={event.duration}
                onClick={() => console.log(`Event ${event.id} clicked`)}
              />
            </div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No events found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;
