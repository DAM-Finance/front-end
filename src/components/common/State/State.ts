import { createContext } from 'react'
import { IPortfolio } from '../../../features/dashboard'

export interface IStateContext {
  portfolio: Partial<IPortfolio>
  setPortfolio: React.Dispatch<React.SetStateAction<Partial<IPortfolio>>>
}
const initialStateContext: IStateContext = {
  portfolio: {},
  setPortfolio: () => {}
}

export const StateContext = createContext<IStateContext>(initialStateContext)
