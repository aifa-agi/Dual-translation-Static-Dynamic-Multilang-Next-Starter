//app/@left/(_AUTH)/login/(_client)/(_ui_components)/auth-login-form.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "./(_client)/(_ui_components)/auth-login-form"
import { SupportedLanguage } from "@/config/translations.config";



export default async function LoginPage({
  params
}: {
  params: Promise<{ lang: SupportedLanguage }>
}) {
  const { lang } = await params;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
           
            <LoginForm lang={lang}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
