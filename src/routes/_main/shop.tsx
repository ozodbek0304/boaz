import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ShopPages from '@/pages/shop/shop'

export const Route = createFileRoute('/_main/shop')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ShopPages/>
}
