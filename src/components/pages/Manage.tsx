import { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Manage.css'
// import Progress from '../common/Progress/Progress'

const Manage: FC = () => {
  return (
    <div className="flex p-4 w-full justify-center py-24 ">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between bg-damtranspgray p-2 rounded-2xl text-gray-500">
          <NavLink className="manage-navbar" to="/manage/borrow">
            <button className="px-6 py-2 flex rounded-xl bg-opacity-5 hover:bg-opacity-10">Borrow</button>
          </NavLink>
          <NavLink className="manage-navbar" to="/manage/deposit">
            <button className="px-6 py-2 flex rounded-xl bg-opacity-5 hover:bg-opacity-10">Deposit</button>
          </NavLink>
          <NavLink className="manage-navbar" to="/manage/repay">
            <button className="px-6 py-2 flex rounded-xl bg-opacity-5 hover:bg-opacity-10">Repay</button>
          </NavLink>
          <NavLink className="manage-navbar" to="/manage/withdraw">
            <button className="px-6 py-2 flex rounded-xl bg-opacity-5 hover:bg-opacity-10">Withdraw</button>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Manage
