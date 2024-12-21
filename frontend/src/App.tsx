
import './index.css'

import { ContentModal } from './Components/ContentModalComponent/ContentModal'
import { Button } from './Components/ButtonComponent/Button'
import { Sidebar } from './Components/SidebarComponent/Sidebar'
import { Topbar } from './Components/TopbarComponent/Topbar'
import { HeroComponent } from './Components/HeroComponent/HeroComponent'
import { RecoilRoot } from 'recoil'



function App() {
 
  return (
    <RecoilRoot>
      <div className='p-5 flex w-screen items-center justify-around'>
        <Topbar/>
      
        <Sidebar/>
        <HeroComponent/>
      
      </div>
    </RecoilRoot>
  )
}

export default App
