"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X, User, LogOut } from "lucide-react"
import { supabase } from "@/app/lib/supabaseClient"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)

    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user || null)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      listener.subscription.unsubscribe()
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Shop Now", href: "/shop", authRequired: true },
  ]

  const handleNav = (href: string, authRequired?: boolean) => {
    if (authRequired && !user) {
      router.push("/login")
    } else {
      router.push(href)
    }
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    setIsOpen(false)
    setIsProfileOpen(false)
  }

  const renderAvatar = (sizeClass = "w-8 h-8") => {
    if (user?.user_metadata?.avatar_url) {
      return (
        <div className={`${sizeClass} relative rounded-full overflow-hidden`}>
          <Image
            src={user.user_metadata.avatar_url}
            alt="User Avatar"
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      )
    }
    return (
      <div className={`${sizeClass} rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium`}>
        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || (<User className="w-1/2 h-1/2" />)}
      </div>
    )
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-green-50 shadow-md"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-lg font-bold text-gray-800 hover:opacity-90 transition-opacity"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-16 h-16 relative flex-shrink-0 md:w-20 md:h-20">
              <Image 
                src="/images/farmer.png"
                alt="Farm Harvest To Home Logo"
                fill
                sizes="(max-width: 768px) 64px, 80px"
                className="rounded-full object-cover"
                priority
              />
            </div>
            <span className="block sm:hidden text-base font-semibold">Farm Harvest To Home</span>
            <span className="hidden sm:block text-xl lg:text-2xl font-bold">Farm Harvest To Home</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.authRequired)}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium text-sm lg:text-base
                  ${pathname === link.href
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-100 hover:text-green-600"}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <button
                onClick={() => router.push("/login")}
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm font-medium"
              >
                <User className="w-4 h-4" />
                Log In
              </button>
            ) : (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pr-2 pl-4 py-1.5 rounded-full bg-white border border-green-100 hover:border-green-300 transition-all shadow-sm"
                >
                  <span className="font-medium text-gray-700 text-sm max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email.split('@')[0]}
                  </span>
                  {renderAvatar("w-8 h-8")}
                </button>

                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-green-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-green-800" /> : <Menu className="w-6 h-6 text-green-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden fixed inset-x-0 top-0 w-full bg-white z-50 transform transition-all duration-500 ease-in-out h-auto max-h-[90vh] overflow-y-auto shadow-2xl border-b border-gray-100 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center h-20 px-4 border-b border-gray-50 sticky top-0 bg-white z-10 w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image 
                src="/images/farmer.png"
                alt="Logo"
                fill
                sizes="40px"
                className="rounded-full object-cover"
              />
            </div>
            <span className="text-base font-bold text-gray-800">Farm Harvest To Home</span>
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col w-full bg-white">
          {/* Main Links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNav(link.href, link.authRequired)}
                className={`flex items-center w-full py-4 px-6 border-b border-gray-50 text-left font-semibold text-lg transition-all
                  ${pathname === link.href
                    ? "text-green-600 bg-green-50"
                    : "text-gray-800 hover:bg-gray-50"}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* User Section */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            {!user ? (
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/login")
                }}
                className="flex items-center justify-center gap-3 w-full py-3 px-6 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all"
              >
                <User className="w-5 h-5" /> Log In
              </button>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {renderAvatar("w-10 h-10")}
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 truncate text-sm">
                      {user.user_metadata?.full_name || user.email.split('@')[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate font-medium">{user.email}</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg text-red-600 bg-white border border-red-100 hover:bg-red-50 transition-colors text-sm font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}
