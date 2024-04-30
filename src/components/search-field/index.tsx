import { SearchIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export default function SearchField() {
  return (
    <div className='w-screen px-4 flex flex-row justify-center items-center'>
      <Input
        placeholder='Buscar Restaurantes'
        className='border-0 flex-1'
      />
      <Button size="icon" >
        <SearchIcon />
      </Button>
    </div>
  )
}
