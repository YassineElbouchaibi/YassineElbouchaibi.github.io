import React from "react"
import { Link } from "gatsby"
import { Popover } from "@headlessui/react"
import { HomeIcon, IdentificationIcon } from "@heroicons/react/outline"
import { EmptyProps } from "@/definitions"

const Header: React.FC<EmptyProps> = () => {
  return (
    <Popover className="sticky top-0 z-10 bg-skin-header backdrop-blur-md backdrop-saturate-150 bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start space-x-10 md:space-x-0 md:flex-col md:space-y-10">
            <Link
              to="/"
              className="rounded-md text-skin-header-fg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-skin-focus"
            >
              <HomeIcon className="h-8 w-auto" />
            </Link>
            <Link
              to="/about"
              className="rounded-md text-skin-header-fg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-skin-focus"
            >
              <IdentificationIcon className="h-8 w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </Popover>
  )
}

export default Header
