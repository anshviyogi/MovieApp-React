import React, { Suspense } from 'react'
import Header from './components/Header'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
// import Body from './components/Body'
import { PropagateLoader } from 'react-spinners'
import InsidePage from './components/InsidePage'

const Body = React.lazy(()=> import('./components/Body'))

function App() {
  return (
    <Router>
      <Routes>
        {/* Page for movie inner page */}
        <Route path='/page/:id' element={<>
        <Header/>
        <InsidePage/>
        </>}/>

{/* Path for home page */}
        <Route path='/' element={<>
        <Header/>
        <Suspense fallback={<><h1 style={{textAlign:"center"}}>Loading Data . . . </h1>
        <div style={{flex:"1",justifyItems:"center",alignItems:"center",display:"flex"}}>
        <PropagateLoader color="#36d7b7" />
        </div>
        </>}>
        <Body/>
        </Suspense>
        </>}/>

      </Routes>
    </Router>
  )
}

export default App