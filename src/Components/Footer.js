import React from "react"

function Footer() {
  return (
    <footer role="navigation" className="border-t border-t-slate-300">
      <div className="w-full h-14 bg-transparent backdrop-blur-xl bottom-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <p className="font-bold">Chris Blancato {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer