import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Home, Smile, User, Moon } from "lucide-react";
import cn from "clsx";

type NavIconProps = {
  href: string;
  icon: string;
  children: ReactNode;
};

export default function NavIcon({ href, icon }: NavIconProps) {
  const router = useRouter();
  const pathname = `/${router.pathname.split("/")[1]}`;
  const active = pathname === href;

  const getIcon = () => {
    switch (icon) {
      case "Home":
        return <Home size={28} strokeWidth={2.5} />;
      case "Smile":
        return <Smile size={28} strokeWidth={2.5} />;
      case "User":
        return <User size={28} strokeWidth={2.5} />;
      case "Theme":
        return <Moon size={28} strokeWidth={2.5} />;
      default:
        return null;
    }
  };

  return (
    <Link
      className={cn(
        "rounded-lg text-sm hover:text-primary hover:bg-secondaryA transition-colors",
        active ? "text-primary" : "text-secondary" //bg-secondaryA
      )}
      href={href}
    >
      {getIcon()}
    </Link>
  );
}
