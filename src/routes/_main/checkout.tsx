import CheckkoutPage from '@/pages/checkout/checkkout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/checkout')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CheckkoutPage/>
}
