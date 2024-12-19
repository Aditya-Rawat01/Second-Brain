
import './index.css'

import { ContentModal } from './Components/ContentModalComponent/ContentModal'
import { Button } from './Components/ButtonComponent/Button'


function App() {
 
  return (
    <div className='p-5 flex w-screen items-center justify-around'>
      <ContentModal title='Yt video' url="val" description='Checking'/>
      
    </div>
  )
}

export default App
