import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CartDrawer } from '../components/cart'
import { Footer } from '../components/footer'
import { Navbar } from '../components/navbar'

function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  )
}

export default MainLayout
