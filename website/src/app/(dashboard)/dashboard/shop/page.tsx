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

// Product images from NovaNAD
const productImages = {
  // NAD+ Products
  nadPen400: 'https://novanad.co.za/cdn/shop/files/NoaNAD2.png?v=1758816837',
  nadPen1000: 'https://novanad.co.za/cdn/shop/files/IMG_2979.heic?v=1759017425',
  nadVial: 'https://novanad.co.za/cdn/shop/files/Group26.png?v=1759018071',
  nad3Pack: 'https://novanad.co.za/cdn/shop/files/nadx31.png?v=1758577358',

  // Peptides & Serums
  ghkcu: 'https://novanad.co.za/cdn/shop/files/ghk.png?v=1758578908',
  glutathioneVial: 'https://novanad.co.za/cdn/shop/files/glutathione.png?v=1758576606',
  glutathionePen: 'https://novanad.co.za/cdn/shop/files/l-glutathione-sq-injection-pen.jpg?v=1759017318',

  // Vitamins
  b12Vial: 'https://novanad.co.za/cdn/shop/files/vitamin-b122.png?v=1758576170',
  b12Pen: 'https://novanad.co.za/cdn/shop/files/vitamin-B12.jpg?v=1759017561',
  biotinVial: 'https://novanad.co.za/cdn/shop/files/biotin3.png?v=1758575806',
  biotinPen: 'https://novanad.co.za/cdn/shop/files/Biotin-sq-injection-pen.jpg?v=1759017536',

  // L-Carnitine
  lcarnitineVial: 'https://novanad.co.za/cdn/shop/files/L-CARNITINE5.png?v=1758575700',
  lcarnitinePen: 'https://novanad.co.za/cdn/shop/files/l-carnatine.jpg?v=1759017595',

  // Supplies & Kits
  syringes: 'https://novanad.co.za/cdn/shop/files/needles.png?v=1758578630',
  wellnessPack: 'https://novanad.co.za/cdn/shop/files/wellness1.png?v=1758577281',
  nasalSpray: 'https://novanad.co.za/cdn/shop/files/revive.png?v=1758579361',
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
    name: 'NovaNAD+ Pen 400mg (Starter)',
    category: 'Peptides',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviews: 312,
    image: productImages.nadPen400,
    badge: 'Best Seller',
    inStock: true,
    description: 'Pre-filled NAD+ injection pen for at-home use',
  },
  {
    id: '2',
    name: 'NovaNAD+ Pen 1000mg (Advanced)',
    category: 'Peptides',
    price: 299.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    image: productImages.nadPen1000,
    badge: 'Popular',
    inStock: true,
    description: 'High-dose NAD+ pen for advanced protocols',
  },
  {
    id: '3',
    name: 'NovaNAD+ Vial 10ml',
    category: 'Peptides',
    price: 199.99,
    originalPrice: 229.99,
    rating: 4.8,
    reviews: 256,
    image: productImages.nadVial,
    badge: 'Sale',
    inStock: true,
    description: '100% bioavailable NAD+ for injection',
  },
  {
    id: '4',
    name: 'GHK-Cu Copper Peptide Serum',
    category: 'Peptides',
    price: 89.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 145,
    image: productImages.ghkcu,
    badge: null,
    inStock: true,
    description: 'Enhanced with hyaluronic acid for skin repair',
  },
  {
    id: '5',
    name: 'Glutathione Vial 10ml (200mg/ml)',
    category: 'Peptides',
    price: 79.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    image: productImages.glutathioneVial,
    badge: 'Essential',
    inStock: true,
    description: 'Master antioxidant for detox & immunity',
  },
  {
    id: '6',
    name: 'Glutathione Pen (200mg/0.6ml)',
    category: 'Peptides',
    price: 119.99,
    originalPrice: 139.99,
    rating: 4.7,
    reviews: 92,
    image: productImages.glutathionePen,
    badge: 'Sale',
    inStock: true,
    description: 'Pre-filled glutathione injection pen',
  },
  {
    id: '7',
    name: 'Nova B12 Vial 10ml (1mg/ml)',
    category: 'Supplements',
    price: 34.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 234,
    image: productImages.b12Vial,
    badge: null,
    inStock: true,
    description: 'Methylcobalamin B12 for energy & focus',
  },
  {
    id: '8',
    name: 'Nova B12 Pen (1mg/0.6ml)',
    category: 'Supplements',
    price: 59.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 156,
    image: productImages.b12Pen,
    badge: null,
    inStock: true,
    description: 'Pre-filled vitamin B12 injection pen',
  },
  {
    id: '9',
    name: 'Nova Biotin Vial 4ml (20mg/ml)',
    category: 'Supplements',
    price: 44.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 89,
    image: productImages.biotinVial,
    badge: null,
    inStock: true,
    description: 'High-dose biotin for hair, skin & nails',
  },
  {
    id: '10',
    name: 'L-Carnitine Vial 10ml (200mg/ml)',
    category: 'Supplements',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 167,
    image: productImages.lcarnitineVial,
    badge: 'Sale',
    inStock: true,
    description: 'Fat metabolism & energy support',
  },
  {
    id: '11',
    name: 'L-Carnitine Pen (200mg/0.6ml)',
    category: 'Supplements',
    price: 69.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 78,
    image: productImages.lcarnitinePen,
    badge: null,
    inStock: true,
    description: 'Pre-filled L-carnitine injection pen',
  },
  {
    id: '12',
    name: 'Syringes & Swab Pack',
    category: 'Supplies',
    price: 24.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 412,
    image: productImages.syringes,
    badge: 'Essential',
    inStock: true,
    description: 'Insulin syringes with alcohol swabs',
  },
  {
    id: '13',
    name: 'Wellness Pack (NAD+, Glutathione, L-Carnitine)',
    category: 'Equipment',
    price: 349.99,
    originalPrice: 429.99,
    rating: 4.9,
    reviews: 67,
    image: productImages.wellnessPack,
    badge: 'Best Value',
    inStock: true,
    description: 'Complete wellness bundle - save 18%',
  },
  {
    id: '14',
    name: 'Revive NRG3 Synapsin Nasal Spray',
    category: 'Supplements',
    price: 89.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 56,
    image: productImages.nasalSpray,
    badge: 'New',
    inStock: true,
    description: 'Cognitive support nasal spray',
  },
  {
    id: '15',
    name: 'NovaNAD+ 3 Pack (SQ 10ml)',
    category: 'Peptides',
    price: 549.99,
    originalPrice: 599.97,
    rating: 4.9,
    reviews: 134,
    image: productImages.nad3Pack,
    badge: 'Best Value',
    inStock: true,
    description: 'Save 8% with 3-pack NAD+ bundle',
  },
]

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  'Popular': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Sale': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  'Essential': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'New': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Best Value': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
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
