"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { navItems } from "@/lib/utils/data";
import { usePathname } from "next/navigation";
import UserMenuDropdown from "./UserMenuDropdown";
import { LIGHT_LOGO } from "@/lib/config/constants";
import { signOut, useSession } from "next-auth/react";
import { CommonButton } from "@/lib/components/buttons";
import vipRing from "@/public/images/common/vip-ring.png";
import { ImageWithFallback } from "@/lib/components/image";
import { hasActiveVipMembership } from "@/lib/utils/helpers";
import { crown, avatar, hamburger } from "@/lib/components/image/icons";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken ?? null;
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Determine if the current user is an admin by checking userRole from session data
  const isAdmin = useMemo(
    () => session?.user.data.userRole === "admin",
    [session]
  );

  // Determine if the user is a VIP or not
  const isVipUser = hasActiveVipMembership(session?.user.data);

  // Toggle the user menu dropdown open/close state
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Close the user menu dropdown
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close the mobile drawer menu with an animation delay for smooth closing effect
  const closeDrawer = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsAnimatingOut(false);
    }, 300);
  }, []);

  // Logout handler, signs the user out via next-auth and shows a toast notification
  const handleLogout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
    setIsMenuOpen(false);
    toast.success("Logout Successfully");
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDrawerOpen, closeDrawer]);

  // Close user menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;

    const hasIgnoreClass = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      if (el.classList.contains("ignore-close-menu")) return true;
      return hasIgnoreClass(el.parentElement);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !hasIgnoreClass(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [isMenuOpen]);

  return (
    <header className="w-full bg-primary text-vipLight relative">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center justify-between px-9 py-4">
        <div className="flex items-center gap-20 xl:gap-24 w-2/3">
          <Link href="/">
            <ImageWithFallback
              src={LIGHT_LOGO}
              width={100}
              height={50}
              alt="logo"
            />
          </Link>
          <nav className="flex items-center gap-12 w-full">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-base font-medium cursor-pointer hover:text-vipHeavy ${
                  pathname === href ? "text-vipHeavy" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-end relative">
          {accessToken ? (
            <div className="flex items-center gap-6">
              <CommonButton
                label="Manage Plan"
                href="/pricing"
                className="flex gap-2 items-center bg-transparent border border-vipHeavy text-vipLight px-5 py-3 rounded-lg"
                startIcon={
                  <ImageWithFallback
                    src={crown}
                    width={15}
                    height={15}
                    alt="crown"
                  />
                }
              />
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className="w-12 h-12 relative flex items-center justify-center"
                  aria-haspopup="true"
                  aria-expanded={isMenuOpen}
                >
                  <div className="w-[45px] h-[45px] relative rounded-full overflow-hidden border border-black">
                    <ImageWithFallback
                      src={session?.user.data.profilePicture?.url}
                      fallBackImage={avatar}
                      alt="user"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {isVipUser && (
                    <ImageWithFallback
                      src={vipRing}
                      width={48}
                      height={48}
                      alt="vip ring"
                      className="z-10 absolute"
                    />
                  )}
                </button>

                {isMenuOpen && (
                  <UserMenuDropdown
                    isAdmin={isAdmin}
                    onClose={closeMenu}
                    menuRef={menuRef}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <CommonButton
                label="Join Now"
                href="/registration"
                className="bg-vipHeavy text-vipLight font-bold px-5 py-2.5 rounded-lg"
              />
              <CommonButton
                label="Sign In"
                href="/login"
                className="border border-vipHeavy text-vipLight font-bold px-5 py-2.5 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden items-center justify-between p-4">
        <ImageWithFallback
          src={hamburger}
          width={22}
          height={16}
          alt="menu"
          onClick={() => setIsDrawerOpen(true)}
          className="cursor-pointer z-10"
        />
        <Link href="/">
          <ImageWithFallback
            src={LIGHT_LOGO}
            width={100}
            height={50}
            alt="logo"
          />
        </Link>
        {accessToken ? (
          <div className="relative z-20">
            <button
              onClick={toggleMenu}
              className="w-12 h-12 relative flex items-center justify-center"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <div className="w-[45px] h-[45px] relative rounded-full overflow-hidden border border-black">
                <ImageWithFallback
                  src={session?.user.data.profilePicture?.url}
                  fallBackImage={avatar}
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>

              {isVipUser && (
                <ImageWithFallback
                  src={vipRing}
                  width={48}
                  height={48}
                  alt="vip ring"
                  className="z-10 absolute"
                />
              )}
            </button>
            {isMenuOpen && (
              <UserMenuDropdown
                isAdmin={isAdmin}
                onClose={closeMenu}
                menuRef={menuRef}
                handleLogout={handleLogout}
              />
            )}
          </div>
        ) : (
          <CommonButton
            href="/login"
            label="Sign In"
            className="border border-vipHeavy text-vipLight font-bold px-5 py-2.5 rounded-lg"
          />
        )}
      </div>

      {/* Mobile Drawer */}
      {(isDrawerOpen || isAnimatingOut) && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            className={`relative w-[250px] h-full bg-primary p-4 shadow-lg z-50 transition-transform duration-300 ${
              isAnimatingOut
                ? "animate-slide-out-left"
                : "animate-slide-in-left"
            }`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex justify-end">
              <RxCross1
                size={20}
                onClick={closeDrawer}
                className="text-red cursor-pointer"
                role="button"
                aria-label="Close menu"
              />
            </div>
            <nav className="flex flex-col gap-4 mt-5">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeDrawer}
                  className={`text-sm font-medium pb-2 border-b border-b-vipLight text-vipLight ${
                    pathname === href ? "text-vipHeavy" : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
