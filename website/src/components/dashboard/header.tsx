'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  Bell,
  Menu,
  X,
  Search,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Beaker,
  LayoutDashboard,
  ClipboardList,
  Syringe,
  Activity,
  ShoppingBag,
  BookOpen,
} from 'lucide-react'

interface HeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const mobileNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Protocols', href: '/dashboard/protocols', icon: ClipboardList },
  { name: 'Injections', href: '/dashboard/injections', icon: Syringe },
  { name: 'Health Tracking', href: '/dashboard/tracking', icon: Activity },
  { name: 'Shop', href: '/dashboard/shop', icon: ShoppingBag },
  { name: 'Learn', href: '/dashboard/learn', icon: BookOpen },
]

// Search suggestions data
const searchSuggestions = [
  { type: 'protocol', name: 'Weight Loss Stack', href: '/dashboard/protocols' },
  { type: 'protocol', name: 'Anti-Aging Protocol', href: '/dashboard/protocols' },
  { type: 'protocol', name: 'Recovery Protocol', href: '/dashboard/protocols' },
  { type: 'peptide', name: 'Semaglutide', href: '/dashboard/learn' },
  { type: 'peptide', name: 'BPC-157', href: '/dashboard/learn' },
  { type: 'peptide', name: 'Tirzepatide', href: '/dashboard/learn' },
  { type: 'peptide', name: 'Ipamorelin', href: '/dashboard/learn' },
  { type: 'peptide', name: 'CJC-1295', href: '/dashboard/learn' },
  { type: 'peptide', name: 'TB-500', href: '/dashboard/learn' },
  { type: 'peptide', name: 'Melanotan II', href: '/dashboard/learn' },
  { type: 'page', name: 'Log Injection', href: '/dashboard' },
  { type: 'page', name: 'View Activity', href: '/dashboard/activity' },
  { type: 'page', name: 'Settings', href: '/dashboard/settings' },
  { type: 'page', name: 'Help & Support', href: '/help' },
]

export function DashboardHeader({ user }: HeaderProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredSuggestions = searchQuery
    ? searchSuggestions.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  const handleSuggestionClick = (href: string) => {
    setSearchQuery('')
    setIsSearchFocused(false)
    router.push(href)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredSuggestions.length > 0) {
      handleSuggestionClick(filteredSuggestions[0].href)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'protocol':
        return 'bg-primary-500/20 text-primary-400'
      case 'peptide':
        return 'bg-accent-500/20 text-accent-400'
      case 'page':
        return 'bg-secondary-500/20 text-secondary-400'
      default:
        return 'bg-slate-700 text-slate-400'
    }
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Beaker className="w-5 h-5 text-white" />
            </div>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search protocols, peptides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                {filteredSuggestions.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {filteredSuggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item.href)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700 transition-colors text-left"
                      >
                        <span className="text-white text-sm">{item.name}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="px-4 py-8 text-center">
                    <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">No results found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try searching for protocols or peptides
                    </p>
                  </div>
                ) : (
                  <div className="px-4 py-3">
                    <p className="text-xs font-medium text-slate-500 uppercase mb-2">
                      Popular Searches
                    </p>
                    {searchSuggestions.slice(0, 5).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item.href)}
                        className="w-full flex items-center justify-between px-2 py-2 hover:bg-slate-700 rounded transition-colors text-left"
                      >
                        <span className="text-white text-sm">{item.name}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-500 rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Avatar
                  src={user.image || undefined}
                  alt={user.name || 'User'}
                  fallback={user.name || 'U'}
                  size="sm"
                />
                <span className="hidden sm:block text-sm text-slate-300">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b border-slate-700">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-accent-400 hover:bg-slate-700 rounded-lg"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-20 bg-slate-900/95 pt-16">
          <nav className="p-4">
            <ul className="space-y-2">
              {mobileNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:bg-slate-800 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}
