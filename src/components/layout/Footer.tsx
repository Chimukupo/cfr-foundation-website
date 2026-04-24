import { MapPin, Mail, Phone } from "lucide-react"
import { Whatsapp } from "@/components/icons/whatsapp"
import { Link } from "react-router-dom"
export function Footer() {
  return (
    <footer className="bg-[#ffffff] py-16 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand/About Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/cfr_icon.png"
                alt="CareFirst Recovery Foundation"
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl leading-none font-extrabold tracking-tight">
                  <span style={{ color: "#dc9e9f" }}>CareFirst</span>
                </span>
                <span className="mt-0.5 text-[10px] font-bold tracking-widest text-neutral-500 dark:text-neutral-400">
                  FOUNDATION
                </span>
              </div>
            </div>
            <p className="pr-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-500">
              CareFirst Recovery Foundation is dedicated to empowering
              marginalized and vulnerable children and youths through relief
              operations and environmental stewardship.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="mb-6 font-bold tracking-wide text-neutral-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="/#organization"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> About Us
                </a>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Blogs
                </Link>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/#organization"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Donate
                </a>
              </li>
              <li>
                <a
                  href="/#events"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Events
                </a>
              </li>
            </ul>
          </div>

          {/* Other Pages Column */}
          <div>
            <h4 className="mb-6 font-bold tracking-wide text-neutral-900 dark:text-white">
              Other Pages
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Work With Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <span className="text-neutral-500"></span> Latest Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h4 className="mb-6 font-bold tracking-wide text-neutral-900 dark:text-white">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
                <span>Ngwezi Road, Lusaka, Zambia</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="h-5 w-5 shrink-0 text-neutral-500" />
                <a
                  href="mailto:carefirstfoundation@hotmail.com"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  carefirstfoundation@hotmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-neutral-500" />
                <span>+260 98 1484409</span>
              </li>
              <li className="flex items-center gap-4">
                <Whatsapp className="h-5 w-5 shrink-0 text-neutral-500" />
                <a
                  href="https://wa.me/260954756031"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  +260 95 4756031
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-300 pt-8 text-center text-sm font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-600">
          <p>
            &copy; {new Date().getFullYear()} CareFirst Recovery Foundation -
            All rights reserved.
          </p>
          <p className="mt-2">
            Powered by{" "}
            <span className="font-bold text-[#000000] dark:text-[#05df72]">
              Cynogen Inc.
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
