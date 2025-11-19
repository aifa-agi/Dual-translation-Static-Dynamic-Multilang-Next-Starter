// components/site-header/auth-button.tsx
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import Link from "next/link"
import { ArrowRight, LogOut } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/app/[lang]/@left/(_AUTH)/login/(_client)/(_ui_components)/auth-login-form"
import { logoutAction } from "@/app/[lang]/@left/(_AUTH)/login/(_server)/actions/auth"
import { initAuthState, useAuth } from "@/app/[lang]/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"
import { SupportedLanguage } from "@/config/translations/translations.config"

interface AuthButtonProps {
  initialAuth: boolean
  lang: SupportedLanguage
}

export function AuthButton({ initialAuth, lang }: AuthButtonProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Initialize auth state from server on mount
  React.useEffect(() => {
    initAuthState(initialAuth)
  }, [initialAuth])

  // Handle successful login from modal
  const handleLoginSuccess = () => {
    setOpen(false)
    
    // Redirect to chat after 2 seconds
    setTimeout(() => {
      router.push(`/${lang}/chat`)
    }, 2000)
  }

  // Handle logout
  const handleLogout = async () => {
    logout() // Update client state immediately
    await logoutAction() // Clear cookie and redirect to home
  }

  // Authenticated state - orange admin button
  if (isAuthenticated) {
    return (
      <Button
        size="sm"
        className="rounded-full bg-orange-500 hover:bg-orange-600 text-white mr-2"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-1" />
        Admin
      </Button>
    )
  }

  // Desktop unauthenticated - link to login page
  if (isDesktop) {
    return (
      <Button
        asChild
        size="sm"
        className="rounded-full bg-white text-black hover:bg-white/70 mr-2"
      >
        <Link href={`/${lang}/login`} className="flex items-center gap-1">
          Login
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="rounded-full bg-white text-black hover:bg-white/70 mr-2"
        >
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Login to your account</DialogTitle>
        <DialogDescription>
          Enter your email below to login to your account
        </DialogDescription>

        <LoginForm onSuccess={handleLoginSuccess} lang={lang}/>
      </DialogContent>
    </Dialog>
  )
}
