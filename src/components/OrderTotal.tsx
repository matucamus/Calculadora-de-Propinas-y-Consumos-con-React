import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalProps = {
  order: OrderItem[],
  tip: number,
  placeOrder: () => void
}

export default function OrderTotal({ order,tip ,placeOrder }: OrderTotalProps) {

  const subtotalAmount = useMemo (() => order.reduce((total, item) => total + (item.quantity * item.price),0), [order])

  const tipAmount = useMemo(() =>subtotalAmount * tip, [ tip, order])
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl"> Totales y Propinas</h2>
            <p>Subtotal a pagar: {""}
              <span className="font-bold"> {formatCurrency(subtotalAmount)}</span>
                
            </p>

            <p>Propina: {""}
              <span className="font-bold"> {formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a pagar: {""}
              <span className="font-bold"> {formatCurrency(totalAmount)}</span>
            </p>

        </div>

        <button
          className="bg-teal-400 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
          disabled={totalAmount === 0 }
          onClick={placeOrder}

        >
          Guardar Orden
        </button>
    
    
    </>
  )
}
