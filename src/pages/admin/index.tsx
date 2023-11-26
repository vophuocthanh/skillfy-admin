import { Input } from '@/components/Input'
import { createContext, useContext, useState } from 'react'
import SummaryChart from './_components/SummaryChart'

export const AppContext = createContext('Son Tran')

function Page() {
  const name = useContext(AppContext)
  return <div> {name} </div>
}

function Dashboard() {
  const [name, setName] = useState('Son Tran')
  return (
    <AppContext.Provider value={name}>
      <div className="p-10 grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <SummaryChart />
        </div>
        <div className="col-span-1">
          <Input value={name} onChange={e => setName(e.target.value)} />
          <div>{name} </div>
        </div>
        <Page />
      </div>
    </AppContext.Provider>
  )
}

export default Dashboard
