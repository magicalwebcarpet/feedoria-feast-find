
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/shared/SearchInput';
import ProductCard from '@/components/shared/ProductCard';
import CategoryFilter from '@/components/shared/CategoryFilter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart, X } from 'lucide-react';
import { products, categories } from '@/lib/data';

interface CartItem {
  id: string;
  product: typeof products[0];
  quantity: number;
}

const StorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, activeCategory]);

  const filterProducts = () => {
    let filtered = [...products];
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.chef.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeCategory !== "All") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prev, { id: productId, product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <MainLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">Feedoria Store</h1>
          <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-6 w-6 text-feedoria-purple" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-feedoria-red hover:bg-feedoria-red-dark">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Your Cart</DrawerTitle>
                  <DrawerDescription>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                  </DrawerDescription>
                </DrawerHeader>
                
                {cartItems.length > 0 ? (
                  <div className="p-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center py-2 border-b">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">{item.product.title}</h4>
                          <p className="text-muted-foreground text-xs">${item.product.price.toFixed(2)} each</p>
                          <div className="flex items-center mt-1">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-5 w-5 rounded-full p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <span>-</span>
                            </Button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-5 w-5 rounded-full p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <span>+</span>
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-medium">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                )}
                
                <DrawerFooter>
                  <Button className="bg-feedoria-purple hover:bg-feedoria-purple-dark" disabled={cartItems.length === 0}>
                    Checkout
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Continue Shopping</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        
        <SearchInput 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-6"
        />
        
        <CategoryFilter
          categories={categories.products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard
                id={product.id}
                title={product.title}
                chef={product.chef}
                price={product.price}
                image={product.image}
                onClick={() => console.log(`Product ${product.id} clicked`)}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default StorePage;
