import React from 'react'
import Calculator from './components/Calculator'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main className="flex justify-center py-8">
          <Calculator />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App