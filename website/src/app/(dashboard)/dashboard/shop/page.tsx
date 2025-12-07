'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  Plus,
  Minus,
} from 'lucide-react'

// Product images - medical/injectable related from Unsplash
const productImages = {
  // Peptide vials
  bpc157: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop', // Medical vial
  semaglutide: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', // Medication
  tb500: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=400&h=400&fit=crop', // Lab vials
  ghkcu: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop', // Research peptide

  // Supplies
  syringes: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=400&h=400&fit=crop', // Syringes
  bacwater: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=400&fit=crop', // Sterile water/vial
  alcoholpads: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', // Medical supplies

  // Equipment
  scale: 'https://images.unsplash.com/photo-1576671494786-d4e2a74e67e0?w=400&h=400&fit=crop', // Body scale
}

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
    image: productImages.bpc157,
    badge: 'Best Seller',
    inStock: true,
    description: 'Research peptide for tissue repair studies',
  },
  {
    id: '2',
    name: 'Semaglutide (3mg)',
    category: 'Peptides',
    price: 149.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: productImages.semaglutide,
    badge: 'Popular',
    inStock: true,
    description: 'GLP-1 receptor agonist for research',
  },
  {
    id: '3',
    name: 'Insulin Syringes (100pk)',
    category: 'Supplies',
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 256,
    image: productImages.syringes,
    badge: null,
    inStock: true,
    description: '29G 1/2" insulin syringes',
  },
  {
    id: '4',
    name: 'Bacteriostatic Water (30ml)',
    category: 'Supplies',
    price: 12.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 312,
    image: productImages.bacwater,
    badge: 'Essential',
    inStock: true,
    description: 'Sterile water for reconstitution',
  },
  {
    id: '5',
    name: 'TB-500 (5mg)',
    category: 'Peptides',
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.6,
    reviews: 78,
    image: productImages.tb500,
    badge: 'Sale',
    inStock: true,
    description: 'Thymosin beta-4 fragment',
  },
  {
    id: '6',
    name: 'GHK-Cu (50mg)',
    category: 'Peptides',
    price: 39.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 65,
    image: productImages.ghkcu,
    badge: null,
    inStock: true,
    description: 'Copper peptide complex',
  },
  {
    id: '7',
    name: 'Alcohol Prep Pads (200pk)',
    category: 'Supplies',
    price: 8.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 189,
    image: productImages.alcoholpads,
    badge: null,
    inStock: true,
    description: '70% isopropyl alcohol wipes',
  },
  {
    id: '8',
    name: 'Digital Body Scale',
    category: 'Equipment',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 42,
    image: productImages.scale,
    badge: 'Sale',
    inStock: true,
    description: 'Smart scale with body composition',
  },
]

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  'Popular': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Sale': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  'Essential': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function DashboardShopPage() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: productId, quantity: 1 }]
    })
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const filteredProducts = selectedCategory
    ? featuredProducts.filter(p => p.category.toLowerCase() === selectedCategory)
    : featuredProducts

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Shop</h1>
          <p className="text-slate-400">Quality peptides, supplies, and equipment</p>
        </div>
        <Button variant="outline" className="relative">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </Button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`p-4 rounded-xl border transition-all ${
              selectedCategory === category.id
                ? 'bg-primary-500/10 border-primary-500/50'
                : 'bg-slate-800/50 border-slate-700/50 hover:border-primary-500/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedCategory === category.id ? 'bg-primary-500/20' : 'bg-slate-700/50'
              }`}>
                <category.icon className={`w-5 h-5 ${
                  selectedCategory === category.id ? 'text-primary-400' : 'text-slate-400'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">{category.name}</h3>
                <p className="text-xs text-slate-400">{category.count} products</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">
          {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Products'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all overflow-hidden group">
              <div className="relative aspect-square bg-slate-700 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <Badge className={badgeColors[product.badge]}>
                      {product.badge}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-slate-400 mb-1">{product.category}</p>
                <h3 className="font-medium text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-2 line-clamp-1">{product.description}</p>
                <div className="flex items-center space-x-1 mb-3">
                  <Star className="w-4 h-4 text-secondary-400 fill-secondary-400" />
                  <span className="text-sm text-white">{product.rating}</span>
                  <span className="text-sm text-slate-500">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button size="sm" onClick={() => addToCart(product.id)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
