
import './index.css'
import { Button } from './Components/button'

function App() {
 
  return (
    <div className='p-5 flex w-screen items-center justify-around'>
      <Button text='Value1' size='sm' variant='primary' shadow="shadow"/>
      <Button text='Value1' size='md' variant='secondary' shadow="shadow"/>
    </div>
  )
}

export default App
