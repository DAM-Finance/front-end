import { FC } from 'react'
interface SwaperInputProps {
  value?: string
  coin: string
  children?: any
  handleChange: (elem: string) => void
}

const SwaperInput: FC<SwaperInputProps> = ({ value = 0, coin, handleChange, children = <></> }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full flex text-gray-400 bg-damdarkgray border-solid border-[1px] border-damdarkgray outline-none focus:border-yellow-300 hover:border-yellow-300 rounded-2xl">
        <input
          value={value}
          onChange={(ev) => handleChange(ev.target.value)}
          type="number"
          className="w-full bg-damdarkgray p-4 text-2xl border-damdarkgray outline-none border-none rounded-2xl"
        />
        <div className="flex items-center pr-4 text-2xl">{coin}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default SwaperInput
