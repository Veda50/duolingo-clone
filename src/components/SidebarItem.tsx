"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
};

export default function SidebarItem({ label, iconSrc, href }: Props) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
    >
      <Image
        src={iconSrc}
        alt="label"
        className="mr-5"
        height={32}
        width={32}
      />
      <Link href={href}>{label}</Link>
    </Button>
  );
}
