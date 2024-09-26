import React from "react"

function Navbar() {
  return (
    <header role="header">
      <nav role="navigation" className="border-b border-b-slate-300">
        <div className="w-full h-14 bg-transparent backdrop-blur-xl sticky top-0">
          <div className="container mx-auto px-4 h-full">
            <div className="flex justify-between items-center h-full">
              <ul className="flex gap-x-6 text-black">
                <li className="font-bold">Lorem</li>
                <li className="font-bold">Ipsum</li>
                <li className="font-bold">Dolor</li>
                <li className="font-bold">Lorem</li>
                <li className="font-bold">Ipsum</li>
                <li className="font-bold">Dolor</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar