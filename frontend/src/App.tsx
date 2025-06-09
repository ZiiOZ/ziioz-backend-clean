import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Tailwind is Working!
        </h1>
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          count is {count}
        </button>
      </div>
      
      <p className="read-the-docs text-center mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
