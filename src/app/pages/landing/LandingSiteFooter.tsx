import { Link } from 'react-router';
import { Logo } from '../../components/brand/Logo';
import { Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const product = [
  { label: 'Discover events', href: '/signup' },
  { label: 'For organizers', href: '#organizers' },
  { label: 'Communities', href: '/signup' },
  { label: 'Pricing', href: '#' },
];

const resources = [
  { label: 'Help center', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'API docs', href: '#' },
  { label: 'Status', href: '#' },
];

const company = [
  { label: 'About us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Privacy policy', href: '#' },
  { label: 'Terms of service', href: '#' },
];

export function LandingSiteFooter() {
  return (
    <footer className="bg-[#1A1A1A] py-20 text-white/90">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="white" showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">AI-powered event experiences</p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-white/50 hover:text-white" aria-label="Twitter">
                <Twitter className="size-4" />
              </a>
              <a href="#" className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-white/50 hover:text-white" aria-label="LinkedIn">
                <Linkedin className="size-4" />
              </a>
              <a href="#" className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-white/50 hover:text-white" aria-label="Instagram">
                <Instagram className="size-4" />
              </a>
              <a href="#" className="rounded-full border border-white/20 p-2 text-white/80 transition-colors hover:border-white/50 hover:text-white" aria-label="Discord community">
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Product</p>
            <ul className="mt-4 space-y-2">
              {product.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('/') ? (
                    <Link to={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Resources</p>
            <ul className="mt-4 space-y-2">
              {resources.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Company</p>
            <ul className="mt-4 space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center">
          <p>© 2026 Eventra. All rights reserved.</p>
          <label className="flex items-center gap-2">
            <span className="sr-only">Language</span>
            <select className="rounded-md border border-white/20 bg-transparent px-2 py-1 text-white outline-none">
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </label>
        </div>
      </div>
    </footer>
  );
}
