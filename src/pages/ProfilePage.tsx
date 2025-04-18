
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Heart, Clock, ShoppingBag } from 'lucide-react';

const ProfilePage = () => {
  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">San Francisco, CA</p>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-around mb-6 text-center">
          <div>
            <div className="font-semibold text-lg">12</div>
            <div className="text-sm text-muted-foreground">Orders</div>
          </div>
          <div>
            <div className="font-semibold text-lg">5</div>
            <div className="text-sm text-muted-foreground">Events</div>
          </div>
          <div>
            <div className="font-semibold text-lg">24</div>
            <div className="text-sm text-muted-foreground">Favorites</div>
          </div>
        </div>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="orders" className="data-[state=active]:text-feedoria-purple">Orders</TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:text-feedoria-purple">Favorites</TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:text-feedoria-purple">Upcoming</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-4">
            <div className="space-y-4">
              <OrderItem 
                title="Homemade Pasta Carbonara"
                chef="Emily Johnson"
                date="April 15, 2025"
                image="https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000"
                status="Delivered"
              />
              <OrderItem 
                title="Thai Red Curry"
                chef="Michael Chen"
                date="April 10, 2025"
                image="https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=1000"
                status="Delivered"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-4">
            <div className="space-y-4">
              <FavoriteItem 
                title="Italian Pasta Making Workshop"
                type="Event"
                image="https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?q=80&w=1000"
              />
              <FavoriteItem 
                title="Truffle Infused Olive Oil"
                type="Product"
                image="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1000"
              />
              <FavoriteItem 
                title="Authentic Lasagna"
                type="Meal"
                image="https://images.unsplash.com/photo-1619895092538-128341789043?q=80&w=1000"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="space-y-4">
              <UpcomingItem 
                title="Farm-to-Table Dining Experience"
                type="Event"
                date="Apr 26, 2025 • 7:30 PM"
                image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000"
              />
              <UpcomingItem 
                title="Chicken Tikka Masala"
                type="Delivery"
                date="Tomorrow • 6:00 PM"
                image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Helper Components
const OrderItem = ({ title, chef, date, image, status }: any) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 flex-shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">By {chef}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
    <div>
      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">{status}</span>
    </div>
  </div>
);

const FavoriteItem = ({ title, type, image }: any) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 flex-shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium">{title}</h3>
      <div className="flex items-center text-xs">
        <Heart className="h-3 w-3 text-feedoria-red mr-1" />
        <span className="text-muted-foreground">{type}</span>
      </div>
    </div>
  </div>
);

const UpcomingItem = ({ title, type, date, image }: any) => (
  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
    <div className="w-16 h-16 flex-shrink-0">
      <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
    </div>
    <div className="flex-grow">
      <h3 className="font-medium">{title}</h3>
      <div className="flex items-center text-xs">
        <Clock className="h-3 w-3 text-feedoria-purple mr-1" />
        <span className="text-muted-foreground">{date}</span>
      </div>
      <div className="text-xs mt-1">
        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">{type}</span>
      </div>
    </div>
  </div>
);

export default ProfilePage;
