import { MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand/About Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-black font-bold text-2xl">
                <span>C</span>
              </div>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed pr-6">
              CareFirst Recovery Foundation is dedicated to empowering marginalized and vulnerable children and youths through relief operations and environmental stewardship.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Our Teams</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Causes</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Donate Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Events</a></li>
            </ul>
          </div>

          {/* Other Pages Column */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Other Pages</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Work With Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Latest Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><span className="text-neutral-600">&rarr;</span> Our Programmes</a></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 text-neutral-500 shrink-0 mt-0.5" />
                <span>123 Recovery Way,<br/>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-neutral-500 shrink-0" />
                <a href="mailto:carefirstfoundation@hotmail.com" className="hover:text-white transition-colors">info@carefirstrecovery.org</a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-neutral-500 shrink-0" />
                <span>+254 700 000 000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-16 pt-8 text-center text-sm text-neutral-600 font-medium">
          <p>&copy; {new Date().getFullYear()} CareFirst Recovery Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
