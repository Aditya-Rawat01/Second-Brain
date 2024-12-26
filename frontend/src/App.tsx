
import './index.css'

import { Sidebar } from './Components/SidebarComponent/Sidebar'
import { Topbar } from './Components/TopbarComponent/Topbar'
import { HeroComponent } from './Components/HeroComponent/HeroComponent'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'



function App() {
  const reactQueryClient=new QueryClient()
  return (
    <RecoilRoot>
      <QueryClientProvider client={reactQueryClient}>
        <div className='p-5 flex w-screen items-center justify-around'>
          <Topbar/>
      
          <Sidebar/>
          <HeroComponent/>
      
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
