import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/tri-snap-logo.png"
                alt="Tri-Snap Logo"
                width={150}
                height={50}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 mt-2">
              The fastest, most accurate, real-time way to access primary care, anytime, anywhere.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#early-access" className="text-gray-300 hover:text-primary transition-colors">
                  Get Early Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions? Reach out to us at{" "}
              <a href="mailto:info@tri-snap.com" className="text-primary hover:underline">
                info@tri-snap.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Tri-Snap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
