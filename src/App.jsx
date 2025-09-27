import React from 'react'
import Navbar from './components/navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <h1 className="text-3xl font-bold uppercase flex items-center justify-center min-h-screen w-full">
        Hello world!
      </h1>
    </div>
  )
}

export default App
