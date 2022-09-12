import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Manage from '../../pages/Manage'
import Swap from '../../pages/Swap'
import Teleport from '../../pages/Teleport'
import ComingSoon from './../../../components/pages/ComingSoon'
import Dashboard from './../../../components/pages/Dashboard'
import NotFound from './../../../components/pages/PageNotFound'

const AppRoutes: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="swap" element={<Swap />} />
        <Route path="manage" element={<Manage />} />
        <Route path="teleport" element={<Teleport />} />
        <Route path="earn" element={<ComingSoon />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
