"use client";

import Link from "next/link";

type ChargerVariantSwitcherProps = {
  activeVariant: "assessment" | "storm-response";
};

const variants = [
  {
    id: "assessment",
    label: "Assessment Flow",
    href: "/prospects/charger-roofing#assessment",
  },
  {
    id: "storm-response",
    label: "Storm Response Landing Page",
    href: "/prospects/charger-roofing/storm-response",
  },
] as const;

export function ChargerVariantSwitcher({ activeVariant }: ChargerVariantSwitcherProps) {
  return (
    <nav
      aria-label="Charger Roofing demo variants"
      className="border-b border-[#ded8d3] bg-white px-4 py-3"
    >
      <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-black uppercase text-[#666666]">Charger demo variants</span>
        <div className="grid gap-2 sm:flex sm:items-center">
          {variants.map((variant) => {
            const isActive = variant.id === activeVariant;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "rounded-lg bg-[#111111] px-3 py-2 text-center text-sm font-extrabold !text-white"
                    : "rounded-lg border border-[#ded8d3] bg-white px-3 py-2 text-center text-sm font-extrabold text-[#202124] transition hover:border-[#c7202f] hover:text-[#c7202f]"
                }
                href={variant.href}
                key={variant.id}
                style={isActive ? { color: "#ffffff" } : undefined}
              >
                {variant.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
