import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Beaker,
  Syringe,
  Pill,
  Package,
} from 'lucide-react'

// Mock product data
const categories = [
  { id: 'peptides', name: 'Peptides', icon: Beaker, count: 24 },
  { id: 'supplies', name: 'Supplies', icon: Syringe, count: 45 },
  { id: 'supplements', name: 'Supplements', icon: Pill, count: 32 },
  { id: 'equipment', name: 'Equipment', icon: Package, count: 18 },
]

const featuredProducts = [
  {
    id: '1',
    name: 'BPC-157 (5mg)',
    category: 'Peptides',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 124,
    image: '/products/bpc-157.jpg',
    badge: 'Best Seller',
    inStock: true,
  },
  {
    id: '2',
    name: 'Semaglutide (3mg)',
    category: 'Peptides',
    price: 149.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: '/products/semaglutide.jpg',
    badge: 'Popular',
    inStock: true,
  },
  {
    id: '3',
    name: 'Insulin Syringes (100pk)',
    category: 'Supplies',
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 256,
    image: '/products/syringes.jpg',
    badge: null,
    inStock: true,
  },
  {
    id: '4',
    name: 'Bacteriostatic Water (30ml)',
    category: 'Supplies',
    price: 12.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 312,
    image: '/products/bac-water.jpg',
    badge: 'Essential',
    inStock: true,
  },
  {
    id: '5',
    name: 'TB-500 (5mg)',
    category: 'Peptides',
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.6,
    reviews: 78,
    image: '/products/tb-500.jpg',
    badge: 'Sale',
    inStock: true,
  },
  {
    id: '6',
    name: 'GHK-Cu (50mg)',
    category: 'Peptides',
    price: 39.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 65,
    image: '/products/ghk-cu.jpg',
    badge: null,
    inStock: false,
  },
  {
    id: '7',
    name: 'Alcohol Prep Pads (200pk)',
    category: 'Supplies',
    price: 8.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 189,
    image: '/products/alcohol-pads.jpg',
    badge: null,
    inStock: true,
  },
  {
    id: '8',
    name: 'Digital Body Scale',
    category: 'Equipment',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 42,
    image: '/products/scale.jpg',
    badge: 'Sale',
    inStock: true,
  },
]

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  'Popular': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Sale': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  'Essential': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background-dark">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Shop Health Products
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Quality peptides, supplies, and equipment for your health journey.
              All products verified and shipped discreetly.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Button variant="outline" size="lg">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart (0)
            </Button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {categories.map((category) => (
              <Link key={category.id} href={`/shop/${category.id}`}>
                <Card className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors">
                      <category.icon className="w-7 h-7 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-slate-400">{category.count} products</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Featured Products */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/shop/product/${product.id}`}>
                  <Card className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer group overflow-hidden">
                    <div className="relative aspect-square bg-slate-700">
                      {/* Placeholder for product image */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Beaker className="w-16 h-16 text-slate-600" />
                      </div>
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <Badge className={badgeColors[product.badge]}>
                            {product.badge}
                          </Badge>
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                          <span className="text-white font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs text-slate-400 mb-1">{product.category}</p>
                      <h3 className="font-medium text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="w-4 h-4 text-secondary-400 fill-secondary-400" />
                        <span className="text-sm text-white">{product.rating}</span>
                        <span className="text-sm text-slate-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
