import React, { ReactNode } from "react"
import { Location } from "history"

import { Header, ThemeSwitch } from "./common"

interface LayoutProps {
  location: Location
  title: string
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={`relative antialiased flex flex-col h-screen md:flex-row overflow-hidden selection:bg-yellow-200 selection:text-black`}
    >
      <div
        className={`absolute top-0 right-0 my-5 mx-10 z-50`}
      >
        <ThemeSwitch />
      </div>
      <Header />
      <main className="flex-1 bg-gradient-to-br from-skin-primary to-skin-secondary transition-colors px-8 lg:px-24 py-8 md:py-16 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default Layout
