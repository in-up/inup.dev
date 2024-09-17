import Image from "next/image";
import Link from "next/link";
import avatar from "public/avatar.png";
import NavIcon from "./NavIcon";
import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "↗️ GitHub", href: "https://github.com/in-up/" },
];
export default function Header() {
  return (
    <header className="sticky top-0 z-10 main-header backdrop-blur-md bg-header">
      <nav className="px-4 md:px-6 py-6 max-w-[1080px] mx-auto flex justify-between items-center">
        <ul className="flex items-center gap-6">
          {links.slice(0, 3).map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.label}</NavLink>
            </li>
          ))}
          <li className="hidden md:block">
            <NavLink href={links[3].href}>{links[3].label}</NavLink>
          </li>
        </ul>
        <div className="flex items-center justify-center w-8 h-8">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
