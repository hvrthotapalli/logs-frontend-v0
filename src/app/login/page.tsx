import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4 text-white" />
            </div>
            LNIP Dashboard
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://dam.infor.com/api/public/content/bb6a72912bbe41908c868a3edbf2a2f3?v=4954d2e2"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover brightness-50 dark:brightness-[0.5] dark:grayscale-20"
        />
      </div>
    </div>
  );
}
