'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Beaker,
  LayoutDashboard,
  ClipboardList,
  Syringe,
  Activity,
  ShoppingBag,
  BookOpen,
  Settings,
  HelpCircle,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Protocols', href: '/dashboard/protocols', icon: ClipboardList },
  { name: 'Injections', href: '/dashboard/injections', icon: Syringe },
  { name: 'Health Tracking', href: '/dashboard/tracking', icon: Activity },
  { name: 'Shop', href: '/shop', icon: ShoppingBag },
  { name: 'Learn', href: '/learn', icon: BookOpen },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900 border-r border-slate-800 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Beaker className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Peptide</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary-500/10 text-primary-400'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-white'
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>

              {/* Secondary Navigation */}
              <li className="mt-auto">
                <ul role="list" className="-mx-2 space-y-1">
                  {secondaryNavigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            'group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors',
                            isActive
                              ? 'bg-primary-500/10 text-primary-400'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          )}
                        >
                          <item.icon
                            className={cn(
                              'h-5 w-5 shrink-0',
                              isActive ? 'text-primary-400' : 'text-slate-500 group-hover:text-white'
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
