/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/LoginForm.tsx — فرم لاگین (Client Component)
   useActionState برای مدیریت state فرم و نمایش خطا استفاده می‌کنه.
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useActionState } from "react";
import { loginAction }    from "./actions";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState }      from "react";

export default function AdminLoginForm() {
  /* state فرم — error از server action برمی‌گرده */
  const [state, formAction, isPending] = useActionState(loginAction, null);

  /* نمایش / مخفی‌کردن پسورد */
  const [showPassword, setShowPassword] = useState(false);

  /* کلاس‌های مشترک input ها */
  const inputClasses =
    "w-full px-4 py-3.5 pr-12 rounded-sm bg-[#112233] border border-[#E8B84B]/15 text-[#F5F0E8] " +
    "font-inter text-sm placeholder:text-[#DDD8CF]/35 " +
    "focus:outline-none focus:border-[#E8B84B]/60 focus:ring-1 focus:ring-[#E8B84B]/20 " +
    "hover:border-[#E8B84B]/30 transition-all duration-200";

  return (
    <div className="bg-[#112233] border border-[#E8B84B]/12 rounded-lg p-8 shadow-2xl shadow-black/30">
      <form action={formAction} noValidate>
        {/* ── نمایش خطا ── */}
        {state?.error && (
          <div
            className="mb-5 px-4 py-3 rounded-sm bg-red-900/25 border border-red-500/30
                       text-red-400 text-sm font-inter flex items-center gap-2"
            role="alert"
          >
            <span className="shrink-0">✕</span>
            {state.error}
          </div>
        )}

        {/* ── فیلد پسورد ── */}
        <div className="mb-6">
          <label
            htmlFor="admin-password"
            className="block text-xs font-medium text-[#DDD8CF]/55 font-inter
                       uppercase tracking-wider mb-2"
          >
            Password
          </label>

          <div className="relative">
            {/* آیکون قفل */}
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DDD8CF]/30"
              strokeWidth={1.5}
            />

            <input
              id="admin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              autoFocus
              placeholder="پسورد ادمین را وارد کنید"
              className={`${inputClasses} pl-10`}
            />

            {/* دکمه نمایش/مخفی پسورد */}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-[#DDD8CF]/30 hover:text-[#E8B84B] transition-colors duration-200"
              aria-label={showPassword ? "مخفی کردن پسورد" : "نمایش پسورد"}
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.5} />
              ) : (
                <Eye size={16} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* ── دکمه ورود ── */}
        <button
          id="admin-login-submit"
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2
                     px-6 py-3.5 rounded-sm font-semibold text-sm font-inter
                     bg-[#E8B84B] text-[#0D1B2A]
                     hover:bg-[#C99A30] active:scale-[0.98]
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-all duration-200 shadow-lg shadow-[#E8B84B]/15"
        >
          {isPending ? (
            /* spinner در حین بررسی */
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <Lock size={15} strokeWidth={2} />
          )}
          {isPending ? "در حال بررسی..." : "ورود به پنل"}
        </button>
      </form>
    </div>
  );
}
