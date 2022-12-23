import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Borrow from '../../manage/Borrow'
import Deposit from '../../manage/Deposit'
import Repay from '../../manage/Repay'
import Withdraw from '../../manage/Withdraw'
import Analytics from '../../pages/Analytics'
import Earn from '../../pages/Earn'
import Manage from '../../pages/Manage'
import Swap from '../../pages/Swap'
import Teleport from '../../pages/Teleport'
// import ComingSoon from './../../../components/pages/ComingSoon'
import Dashboard from './../../../components/pages/Dashboard'
import NotFound from './../../../components/pages/PageNotFound'

const AppRoutes: FC = () => {
  return (
    <div className="bg-damdarkgray">
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="swap" element={<Swap />} />

        <Route path="manage" element={<Manage />}>
          <Route path="borrow" element={<Borrow />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="repay" element={<Repay />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route index element={<Navigate to="/manage/borrow" replace />} />
        </Route>

        <Route path="teleport" element={<Teleport />} />
        <Route path="earn" element={<Earn />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </div>
  )
}

export default AppRoutes
