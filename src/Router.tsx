import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History'
import { DefaultLayout } from './layouts/DefaultLayout/Index'
import { Home } from './pages/Home/Index'

export function Router() {
  return (
    <Routes>
      {/* aplica o layout */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
