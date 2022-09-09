import { createContext } from 'react'
import { IPortolio } from '../../../features/dashboard'

interface IStateContext {
  portfolio: Partial<IPortolio>
  setPortfolio: React.Dispatch<React.SetStateAction<Partial<IPortolio>>>
}
const stateContext: IStateContext = {
  portfolio: {},
  setPortfolio: () => {}
}

export const StateContext = createContext<IStateContext>(stateContext)
