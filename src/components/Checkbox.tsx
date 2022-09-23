import { FC } from 'react'
import utils from '../constants/utils'

interface CheckboxProps {
  children: any
  selected: boolean
  handleClick: () => void
}

const Checkbox: FC<CheckboxProps> = ({ children, selected, handleClick }) => {
  let selectedImg = <img src={utils.getImageSrc('check.svg')} alt="check option" />
  if (!selected) {
    selectedImg = <img src={utils.getImageSrc('uncheck.svg')} alt="uncheck option" />
  }
  return (
    <div onClick={handleClick} className={`flex hover:opacity-100 gap-2 cursor-pointer ${selected ? '' : 'opacity-30'}`}>
      {selectedImg}
      <div>{children}</div>
    </div>
  )
}

export default Checkbox
