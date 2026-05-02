import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'Badol Tyre Ghar | Bangladesh\'s #1 B2B Tyre Wholesale Network',
  description: 'Bangladesh\'s most trusted tyre and automotive accessory B2B wholesaler. 20+ years of experience, 500+ garage partners. Tubes, Patches, Flaps, Tyres & more.',
  keywords: 'tyre wholesale bangladesh, tube supplier rangpur, patch supplier, tyre distributor, B2B tyre',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-surface font-sans antialiased">
        <Header />
        <main className="pt-[104px] min-h-screen">
          {children}
        </main>
        <Footer />

        {/* Sticky WhatsApp FAB */}
        <a
          href="https://wa.me/8801647794452?text=আমি আপনার পণ্য সম্পর্কে জানতে চাই"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-[60] bg-wa text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-3xl">chat</span>
          <span className="absolute right-20 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-slate-100">
            Wholesale Enquiry
          </span>
        </a>
      </body>
    </html>
  )
}
