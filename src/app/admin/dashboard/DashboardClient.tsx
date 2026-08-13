/* ─────────────────────────────────────────────────────────────────────────────
   src/app/admin/dashboard/DashboardClient.tsx — داشبورد (Client Component)
   رابط کاربری کامل پنل ادمین با سه بخش:
     ۱. آپدیت شماره تلفن
     ۲. آپلود رزومه
     ۳. لاگ‌اوت
   ───────────────────────────────────────────────────────────────────────────── */

"use client";

import { useActionState, useRef, useState }   from "react";
import { Phone, FileText, LogOut, Upload, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import {
  updatePhoneAction,
  uploadResumeAction,
  deleteResumeAction,
  logoutAction,
} from "../actions";

/* ── نوع props دریافتی از server component ── */
interface DashboardClientProps {
  currentPhone:   string;
  resumeAvailable: boolean;
  resumeFileName:  string;
}

/* ──────────────────────────────
   کامپوننت نمایش پیام نتیجه
   ────────────────────────────── */
function ResultBanner({
  state,
}: {
  state: { error?: string; success?: string } | null;
}) {
  if (!state) return null;

  if (state.success) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-sm
                      bg-emerald-900/25 border border-emerald-500/30 text-emerald-400
                      text-sm font-inter mt-4">
        <CheckCircle size={16} />
        {state.success}
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-sm
                      bg-red-900/25 border border-red-500/30 text-red-400
                      text-sm font-inter mt-4">
        <AlertCircle size={16} />
        {state.error}
      </div>
    );
  }

  return null;
}

/* ── کلاس مشترک فیلدهای input ── */
const inputCls =
  "w-full px-4 py-3 rounded-sm bg-[#0D1B2A] border border-[#E8B84B]/15 text-[#F5F0E8] " +
  "font-inter text-sm placeholder:text-[#DDD8CF]/35 " +
  "focus:outline-none focus:border-[#E8B84B]/60 focus:ring-1 focus:ring-[#E8B84B]/20 " +
  "hover:border-[#E8B84B]/30 transition-all duration-200";

/* ── کلاس مشترک کارت‌های بخش‌ها ── */
const cardCls =
  "bg-[#112233] border border-[#E8B84B]/10 rounded-lg p-6 md:p-8";

export default function DashboardClient({
  currentPhone,
  resumeAvailable,
  resumeFileName,
}: DashboardClientProps) {
  /* ── state برای بخش شماره تلفن ── */
  const [phoneState, phoneAction, phonePending] = useActionState(
    updatePhoneAction,
    null
  );

  /* ── state برای بخش آپلود رزومه ── */
  const [resumeState, resumeAction, resumePending] = useActionState(
    uploadResumeAction,
    null
  );

  /* ── state برای حذف رزومه ── */
  const [deleteState, setDeleteState] = useState<{
    error?: string;
    success?: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ── ref برای نمایش نام فایل انتخاب‌شده ── */
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");

  /* ── وقتی فایل انتخاب می‌شه ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ? file.name : "");
  };

  /* ── حذف رزومه ── */
  const handleDelete = async () => {
    if (!confirm("آیا مطمئنید که می‌خواهید رزومه را حذف کنید؟")) return;
    setDeleting(true);
    const result = await deleteResumeAction();
    setDeleteState(result);
    setDeleting(false);
    if (result.success) {
      setSelectedFile("");
    }
  };

  /* ── آیا رزومه موجوده (با توجه به آخرین عملیات) ── */
  const resumeExists =
    resumeAvailable &&
    !resumeState?.success && // بعد از آپلود موفق، فرض می‌کنیم هست
    !deleteState?.success;    // بعد از حذف موفق، فرض می‌کنیم نیست

  const resumeExistsNow =
    (resumeAvailable && !deleteState?.success) || resumeState?.success != null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

      {/* ══════════════════════════════════════════
          بخش ۱: آپدیت شماره تلفن
          ══════════════════════════════════════════ */}
      <section className={cardCls}>
        {/* هدر بخش */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#E8B84B]/10 flex items-center justify-center flex-shrink-0">
            <Phone size={18} className="text-[#E8B84B]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-[#F5F0E8]">
              شماره تماس
            </h2>
            <p className="text-xs text-[#DDD8CF]/50 font-inter mt-0.5">
              شماره نمایش داده‌شده در صفحه Contact سایت
            </p>
          </div>
        </div>

        {/* فرم شماره تلفن */}
        <form action={phoneAction}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="admin-phone"
                className="block text-xs font-medium text-[#DDD8CF]/55 font-inter
                           uppercase tracking-wider mb-2"
              >
                شماره فعلی
              </label>

              {/* نمایش شماره فعلی */}
              <div className="mb-3 px-3 py-2 rounded-sm bg-[#E8B84B]/5 border border-[#E8B84B]/15
                              text-[#E8B84B] text-sm font-inter font-medium inline-flex items-center gap-2">
                <Phone size={13} strokeWidth={1.5} />
                {currentPhone}
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-phone"
                className="block text-xs font-medium text-[#DDD8CF]/55 font-inter
                           uppercase tracking-wider mb-2"
              >
                شماره جدید
              </label>
              <input
                id="admin-phone"
                name="phone"
                type="tel"
                defaultValue={currentPhone}
                placeholder="مثال: 647-983-2668"
                className={inputCls}
                required
              />
            </div>

            <button
              id="admin-phone-save"
              type="submit"
              disabled={phonePending}
              className="flex items-center gap-2 px-6 py-3 rounded-sm
                         bg-[#E8B84B] text-[#0D1B2A] font-semibold text-sm font-inter
                         hover:bg-[#C99A30] active:scale-[0.98]
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              {phonePending ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : null}
              {phonePending ? "در حال ذخیره..." : "ذخیره شماره"}
            </button>
          </div>

          <ResultBanner state={phoneState} />
        </form>
      </section>

      {/* ══════════════════════════════════════════
          بخش ۲: آپلود رزومه
          ══════════════════════════════════════════ */}
      <section className={cardCls}>
        {/* هدر بخش */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#E8B84B]/10 flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-[#E8B84B]" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-playfair text-xl font-bold text-[#F5F0E8]">
              رزومه
            </h2>
            <p className="text-xs text-[#DDD8CF]/50 font-inter mt-0.5">
              فایل PDF رزومه برای دانلود توسط بازدیدکنندگان
            </p>
          </div>
        </div>

        {/* وضعیت فعلی رزومه */}
        {resumeExistsNow && (
          <div className="mb-5 flex items-center justify-between
                          px-4 py-3 rounded-sm bg-emerald-900/15 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-inter">
              <FileText size={15} strokeWidth={1.5} />
              <span>
                {resumeState?.success ? "رزومه جدید آپلود شد" : `رزومه موجود: ${resumeFileName}`}
              </span>
            </div>
            {/* دکمه حذف */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs text-red-400/70
                         hover:text-red-400 transition-colors duration-200 font-inter"
            >
              <Trash2 size={13} strokeWidth={1.5} />
              {deleting ? "حذف..." : "حذف رزومه"}
            </button>
          </div>
        )}

        {deleteState && <ResultBanner state={deleteState} />}

        {/* فرم آپلود */}
        <form action={resumeAction}>
          <div className="space-y-4">
            {/* منطقه drag-and-drop/انتخاب فایل */}
            <div>
              <label
                htmlFor="admin-resume-file"
                className="block text-xs font-medium text-[#DDD8CF]/55 font-inter
                           uppercase tracking-wider mb-2"
              >
                {resumeExistsNow ? "جایگزین کردن رزومه" : "آپلود رزومه"}
              </label>

              {/* منطقه آپلود با استایل سفارشی */}
              <label
                htmlFor="admin-resume-file"
                className="flex flex-col items-center justify-center
                           border-2 border-dashed border-[#E8B84B]/20 rounded-lg
                           p-8 cursor-pointer text-center
                           hover:border-[#E8B84B]/50 hover:bg-[#E8B84B]/3
                           transition-all duration-200 group"
              >
                <Upload
                  size={28}
                  className="text-[#DDD8CF]/30 group-hover:text-[#E8B84B]/60
                             transition-colors duration-200 mb-3"
                  strokeWidth={1.5}
                />
                {selectedFile ? (
                  <p className="text-[#E8B84B] text-sm font-inter font-medium">
                    {selectedFile}
                  </p>
                ) : (
                  <>
                    <p className="text-[#DDD8CF]/55 text-sm font-inter mb-1">
                      کلیک کنید یا فایل را اینجا رها کنید
                    </p>
                    <p className="text-[#DDD8CF]/30 text-xs font-inter">
                      فقط PDF · حداکثر ۱۰MB
                    </p>
                  </>
                )}
              </label>

              <input
                id="admin-resume-file"
                name="resume"
                type="file"
                accept="application/pdf,.pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </div>

            <button
              id="admin-resume-upload"
              type="submit"
              disabled={resumePending || !selectedFile}
              className="flex items-center gap-2 px-6 py-3 rounded-sm
                         bg-[#E8B84B] text-[#0D1B2A] font-semibold text-sm font-inter
                         hover:bg-[#C99A30] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              {resumePending ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <Upload size={15} strokeWidth={2} />
              )}
              {resumePending ? "در حال آپلود..." : "آپلود رزومه"}
            </button>
          </div>

          <ResultBanner state={resumeState} />
        </form>
      </section>

      {/* ══════════════════════════════════════════
          بخش ۳: لاگ‌اوت
          ══════════════════════════════════════════ */}
      <section className={`${cardCls} flex items-center justify-between`}>
        <div>
          <p className="text-[#F5F0E8] font-inter text-sm font-medium">خروج از پنل ادمین</p>
          <p className="text-[#DDD8CF]/40 text-xs font-inter mt-0.5">
            session پاک می‌شه و برمی‌گردی به صفحه لاگین
          </p>
        </div>

        <form action={logoutAction}>
          <button
            id="admin-logout-btn"
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-sm
                       border border-red-500/25 text-red-400/70
                       hover:border-red-500/60 hover:text-red-400 hover:bg-red-900/10
                       transition-all duration-200 text-sm font-inter font-medium"
          >
            <LogOut size={15} strokeWidth={1.5} />
            خروج
          </button>
        </form>
      </section>
    </div>
  );
}
