//aapp/[lang]/@left/(_AUTH)/login/(_client)/(_ui_components)/auth-login-form.tsx
"use client"

import * as React from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useAuth } from "@/app/[lang]/@left/(_AUTH)/login/(_client)/(_hooks)/use-auth-state"
import { loginAction } from "../../(_server)/actions/auth"
import { SupportedLanguage } from "@/config/translations/translations.config"
interface LoginFormProps extends React.ComponentProps<"form"> {
  onSuccess?: () => void
  lang: SupportedLanguage 
}


export function LoginForm({ 
  lang,
  className, 
  onSuccess,
  ...props 
}: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const { login } = useAuth()
  const router = useRouter()

  // Handle successful authentication
 React.useEffect(() => {
    if (state?.success) {
      login()
      
      if (onSuccess) {
        onSuccess()
      } else {
        if(lang) {setTimeout(() => {
          router.push(`/${lang}/chat`) 
        }, 2000)}
        
      }
    }
  }, [state, login, onSuccess, router, lang]) 

  return (
    <form 
      className={cn("flex flex-col gap-6", className)} 
      action={formAction}
      {...props}
    >
      <FieldGroup>
        {/* Email field */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={isPending}
            autoComplete="email"
          />
        </Field>
        
        {/* Password field */}
        <Field>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline truncate max-w-[150px]"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            required
            disabled={isPending}
            autoComplete="current-password"
          />
        </Field>
        
        {/* Error/Success message */}
        {state?.message && (
          <p className={cn(
            "text-sm",
            state.success ? "text-green-600" : "text-red-600"
          )}>
            {state.message}
          </p>
        )}
        
        {/* Action buttons */}
        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
          <Button variant="outline" type="button" className="w-full">
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
