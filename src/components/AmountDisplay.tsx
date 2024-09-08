import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label: string,
    amount: number
}

export default function AmountDisplay({label, amount}  : AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-500 font-bold">
        {label}: &nbsp;
        <span className="text-black font-normal">
            {formatCurrency(amount)}
        </span>
    </p>
  )
}
