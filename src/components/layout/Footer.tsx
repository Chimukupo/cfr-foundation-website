import { MapPin, Mail, Phone } from "lucide-react"
import { WhatsappIcon } from "@/components/icons/simple-icons-whatsapp"

export function Footer() {
  return (
    <footer className="bg-[#ffffff] dark:bg-neutral-950 text-neutral-700 dark:text-neutral-400 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand/About Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src="/images/cfr_icon.png" alt="CareFirst Recovery Foundation" className="h-12 w-12 object-contain" />
              <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight leading-none">
              <span style={{ color: '#dc9e9f' }}>CareFirst</span>
            </span>
            <span className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 tracking-widest mt-0.5">FOUNDATION</span>
          </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed pr-6">
              CareFirst Recovery Foundation is dedicated to empowering marginalized and vulnerable children and youths through relief operations and environmental stewardship.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-neutral-900 dark:text-white font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> About Us</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Blogs</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Contact Us</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Donate</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Events</a></li>
            </ul>
          </div>

          {/* Other Pages Column */}
          <div>
            <h4 className="text-neutral-900 dark:text-white font-bold mb-6 tracking-wide">Other Pages</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Work With Us</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-500">&rarr;</span> Latest Stories</a></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-neutral-900 dark:text-white font-bold mb-6 tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                <span>Ngwezi Road, Lusaka, Zambia</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-neutral-500 shrink-0" />
                <a href="mailto:carefirstfoundation@hotmail.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">carefirstfoundation@hotmail.com</a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-neutral-500 shrink-0" />
                <span>+260 98 1484409</span>
              </li>
              <li className="flex items-center gap-4">
                <WhatsappIcon className="h-5 w-5 text-neutral-500 shrink-0" />
                <a href="https://wa.me/260954756031" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 dark:hover:text-white transition-colors">+260 95 4756031</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-300 dark:border-neutral-800 mt-16 pt-8 text-center text-sm text-neutral-500 dark:text-neutral-600 font-medium">
          <p>&copy; {new Date().getFullYear()} CareFirst Recovery Foundation - All rights reserved. Powered by <span className="font-bold text-[#000000] dark:text-[#37ff14]">Cynogen Inc.</span></p>
        </div>
      </div>
    </footer>
  )
}
