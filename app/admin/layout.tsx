import { Inter } from 'next/font/google'

import { ModalProvider } from '@/app/admin/providers/modal-provider'
import { ThemeProvider } from '@/app/admin/providers/theme-provider'

import { ToastProvider } from '@/app/admin/providers/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'All Admin Dashboard',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ToastProvider />
      <ModalProvider />
      {children}
    </>
  )
}
