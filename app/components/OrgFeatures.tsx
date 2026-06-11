"use client";

import {
  CalendarDays,
  UserPlus,
  Network,
  GraduationCap,
  Workflow,
  MessagesSquare,
  LayoutGrid,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader, IconTile } from "./ui";
import { orgFeatures, type OrgFeature } from "../lib/dummy";

const ICONS: Record<OrgFeature["icon"], LucideIcon> = {
  calendar: CalendarDays,
  recruit: UserPlus,
  org: Network,
  diploma: GraduationCap,
  structure: Workflow,
  forum: MessagesSquare,
  matrix: LayoutGrid,
  activity: Activity,
};

/** Grid "Fitur Organisasi" — 4 kolom, tile navy seragam. */
export default function OrgFeatures() {
  return (
    <section>
      <SectionHeader title="Fitur Organisasi" />
      <div className="rounded-3xl bg-white p-4 shadow-sm shadow-brand-900/5 ring-1 ring-neutral-100">
        <div className="grid grid-cols-4 gap-x-2 gap-y-5">
          {orgFeatures.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <button
                key={f.label}
                type="button"
                className="flex flex-col items-center gap-1.5 transition active:scale-95"
              >
                <IconTile size={52}>
                  <Icon size={24} strokeWidth={1.9} />
                </IconTile>
                <span className="text-center text-[11px] font-medium leading-tight text-neutral-700">
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
