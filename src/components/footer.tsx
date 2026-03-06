import Link from "next/link"
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* 
          MOBILE FOOTER (Visible only on small screens) 
          Matches the reference image style: Centered, Dark, Stacked sections
      */}
      <div className="md:hidden flex flex-col items-center text-center px-6 py-12 space-y-10">
        {/* Brand Section */}
        <div className="flex flex-col items-center">
          <div className="p-1.5 bg-white rounded-full mb-4">
            <Image
              src="/images/farmer.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Farm Harvest <span className="text-green-500">To Home</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-[280px]">
            Leading the way in connecting you with tribal and small farmers for pure, unpolished traditional grains.
          </p>
          
          {/* Social Icons */}
          <div className="flex space-x-6 text-xl mt-6">
            <a href="https://www.facebook.com/share/175Y72VCNJ/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/farmharvesttohome/?next=%2F" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="https://wa.me/918495862494" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="w-full">
          <h3 className="text-green-600 font-bold text-sm uppercase tracking-[0.2em] mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">What We Do</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Copyright (Mobile) */}
        <div className="text-[10px] text-gray-500 pt-4 border-t border-gray-800 w-full">
          © {currentYear} <span className="text-gray-400">Farm Harvest To Home</span>. All rights reserved.
        </div>
      </div>

      {/* 
          DESKTOP FOOTER (Visible on md and larger) 
          Restored to the 4-column layout you preferred
      */}
      <div className="hidden md:block pt-12 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/farmer.png"
                alt="Farmer"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="text-white font-semibold">
                Farm Harvest <br />
                <span className="text-green-500 text-base lg:text-lg">To Home</span>
              </span>
            </div>
            <div className="space-y-3 text-sm text-gray-300 mt-6">
              <div className="flex items-center gap-2">
                <Image src="/images/phone.png" alt="Phone" width={20} height={20} />
                <a href="tel:+918495862494" className="hover:text-green-500 transition">+91-8495862494</a>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/images/email.png" alt="Email" width={20} height={20} />
                <a href="mailto:farmharvesttohome@gmail.com" className="hover:text-green-500 transition">farmharvesttohome@gmail.com</a>
              </div>
              <div className="flex items-start gap-2">
                <Image src="/images/location.png" alt="Location" width={20} height={20} className="mt-1" />
                <span className="text-xs leading-relaxed">No 10, 4th Floor, Gaduniya Complex, Ramaiah Layout, Bangalore - 560097</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-10">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-green-500 transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-green-500 transition">Contact</Link></li>
              <li><Link href="/services" className="hover:text-green-500 transition">Services</Link></li>
              <li><Link href="/blog" className="hover:text-green-500 transition">Blog</Link></li>
              <li><Link href="/faqs" className="hover:text-green-500 transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-green-500 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-green-500 transition">Terms & Conditions</Link></li>
              <li><Link href="/shipping" className="hover:text-green-500 transition">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="https://www.facebook.com/share/175Y72VCNJ/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><FaFacebook /></a>
              <a href="https://www.instagram.com/farmharvesttohome/?next=%2F" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><FaInstagram /></a>
              <a href="https://wa.me/918495862494" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-xs text-gray-500">
          © {currentYear} <span className="text-white font-medium">Farm Harvest To Home</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
