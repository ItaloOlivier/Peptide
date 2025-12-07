import Link from 'next/link'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Beaker,
  Minus,
  Plus,
} from 'lucide-react'

// Mock product data
const product = {
  id: '1',
  name: 'BPC-157 (5mg)',
  category: 'Peptides',
  price: 49.99,
  originalPrice: 59.99,
  rating: 4.8,
  reviews: 124,
  description: 'BPC-157 is a synthetic peptide that is being investigated for its regenerative effects. It is a sequence of amino acids with a molecular formula of 62 carbons, 98 hydrogens, 16 nitrogens, and 22 oxygens.',
  benefits: [
    'Supports tissue healing',
    'May improve gut health',
    'Research peptide for study purposes',
    'High purity (>98%)',
  ],
  specifications: [
    { label: 'Purity', value: '≥98%' },
    { label: 'Molecular Weight', value: '1419.53 g/mol' },
    { label: 'Sequence', value: 'Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val' },
    { label: 'Storage', value: 'Store at -20°C' },
    { label: 'Form', value: 'Lyophilized Powder' },
  ],
  inStock: true,
  stockCount: 45,
}

const relatedProducts = [
  { id: '2', name: 'TB-500 (5mg)', price: 44.99, rating: 4.6 },
  { id: '3', name: 'Bacteriostatic Water', price: 12.99, rating: 4.9 },
  { id: '4', name: 'Insulin Syringes', price: 24.99, rating: 4.7 },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background-dark">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/shop"
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <div className="aspect-square bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <Beaker className="w-32 h-32 text-slate-600" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-500">
                    <Beaker className="w-8 h-8 text-slate-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge className="bg-primary-500/10 text-primary-400 mb-2">Best Seller</Badge>
                <p className="text-sm text-slate-400">{product.category}</p>
                <h1 className="text-3xl font-bold text-white mt-1">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(product.rating)
                          ? 'text-secondary-400 fill-secondary-400'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white">{product.rating}</span>
                <span className="text-slate-400">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="accent">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.inStock ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400">In Stock</span>
                    <span className="text-slate-400">({product.stockCount} available)</span>
                  </>
                ) : (
                  <span className="text-accent-400">Out of Stock</span>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center bg-slate-800 rounded-lg">
                  <button className="p-3 text-slate-400 hover:text-white">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-white">1</span>
                  <button className="p-3 text-slate-400 hover:text-white">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <Button size="lg" className="flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="px-4">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <Card className="bg-slate-800/50 border-slate-700/50 mb-6">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-slate-300">
                        <Check className="w-4 h-4 text-primary-400 mr-2 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Truck className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Free Shipping</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <Shield className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Secure Payment</p>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description and Specifications */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Specifications</h3>
                <dl className="space-y-3">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between">
                      <dt className="text-slate-400">{spec.label}</dt>
                      <dd className="text-white font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/shop/product/${item.id}`}>
                  <Card className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer">
                    <div className="aspect-video bg-slate-700 rounded-t-xl flex items-center justify-center">
                      <Beaker className="w-12 h-12 text-slate-600" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white mb-2">{item.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">${item.price}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-secondary-400 fill-secondary-400 mr-1" />
                          <span className="text-sm text-slate-400">{item.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
