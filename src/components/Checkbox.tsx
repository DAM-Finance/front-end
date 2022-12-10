import { FC } from 'react'
import utils from '../constants/utils'

interface CheckboxProps {
  children: any
  selected: boolean
  disabled: boolean
  handleClick: () => void
}

const Checkbox: FC<CheckboxProps> = ({ children, selected, disabled, handleClick }) => {
  let selectedImg = <img src={utils.getImageSrc('check.svg')} alt="check option" />
  if (!selected) {
    selectedImg = <img src={utils.getImageSrc('uncheck.svg')} alt="uncheck option" />
  }

  let checkboxOpacity = 'opacity-90'
  if (disabled) {
    checkboxOpacity = 'opacity-20 cursor-not-allowed'
  }
  if (selected) {
    checkboxOpacity = ''
  }

  const onClick = () => {
    if (!disabled) {
      handleClick()
    }
  }

  return (
    <div onClick={onClick} className={`flex hover:opacity-100 gap-2 cursor-pointer ${checkboxOpacity}`}>
      {selectedImg}
      <div>{children}</div>
    </div>
  )
}

export default Checkbox
