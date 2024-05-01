import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { MenuIcon, X } from 'lucide-react'
import LoginSection from './login-section'

export default function SideMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='w-full flex flex-col justify-start items-start'>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-lg font-semibold text-left'>Menu</h1>
            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <X size={24} />
              </Button>
            </SheetClose>
          </div>
          <LoginSection className='pt-6'/>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
