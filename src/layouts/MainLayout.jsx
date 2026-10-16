import { Outlet } from 'react-router-dom'
import { Footer } from '../components/footer'
import { Navbar } from '../components/navbar'

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
