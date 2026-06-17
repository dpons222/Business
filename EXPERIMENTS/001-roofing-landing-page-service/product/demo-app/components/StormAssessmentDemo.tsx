"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CloudHail,
  FileText,
  Home,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { ProspectData } from "../lib/prospects";
import { ChargerVariantSwitcher } from "./ChargerVariantSwitcher";

type StormAssessmentDemoProps = {
  prospect: ProspectData;
};

const issueTypes = [
  {
    id: "hail",
    icon: CloudHail,
    label: "Hail hit nearby",
    description: "I want the roof checked after hail or severe weather.",
    mobileDescription: "Roof check after hail.",
  },
  {
    id: "leak",
    icon: AlertTriangle,
    label: "Leak or stain",
    description: "I see water, staining, or a possible active roof leak.",
    mobileDescription: "Water stain or active leak.",
  },
  {
    id: "wind",
    icon: Home,
    label: "Wind damage",
    description: "I see missing shingles, lifted edges, or exterior damage.",
    mobileDescription: "Missing shingles or lifted edges.",
  },
  {
    id: "not-sure",
    icon: ShieldCheck,
    label: "Not sure yet",
    description: "I do not see obvious damage but want peace of mind.",
    mobileDescription: "Peace of mind after a storm.",
  },
] as const;

const contactFields = [
  { id: "name", label: "Name", placeholder: "Your name" },
  { id: "phone", label: "Phone", placeholder: "Best phone number" },
  { id: "zip", label: "Property ZIP", placeholder: "San Antonio ZIP code" },
] as const;

const mobileInspectionSummary = [
  "Roof surface review",
  "Visible hail check",
  "Vents, gutters, and skylights",
  "Damage explanation and options",
];

export function StormAssessmentDemo({ prospect }: StormAssessmentDemoProps) {
  const [issueType, setIssueType] = useState<(typeof issueTypes)[number]["id"]>("hail");
  const [selectedSigns, setSelectedSigns] = useState<string[]>([
    prospect.damageSigns[0],
    prospect.damageSigns[1],
  ]);
  const [submitted, setSubmitted] = useState(false);

  const selectedIssue = issueTypes.find((issue) => issue.id === issueType) ?? issueTypes[0];
  const progress = Math.min(100, 34 + selectedSigns.length * 11 + (submitted ? 22 : 0));

  const recommendation = useMemo(() => {
    if (issueType === "leak") {
      return "Higher priority: request an inspection callback and describe the leak location.";
    }

    if (issueType === "hail" || selectedSigns.length >= 2) {
      return "Recommended: schedule a free hail damage inspection so visible concerns can be reviewed.";
    }

    return "Recommended: start with a free roof checkup for peace of mind after severe weather.";
  }, [issueType, selectedSigns.length]);

  function toggleSign(sign: string) {
    setSubmitted(false);
    setSelectedSigns((current) =>
      current.includes(sign) ? current.filter((item) => item !== sign) : [...current, sign],
    );
  }

  return (
    <main
      className="assessment-demo min-h-screen bg-[#f4f1ee] text-[#202124]"
      style={
        {
          "--primary": prospect.brand.primary,
          "--primary-dark": prospect.brand.primaryDark,
          "--accent": prospect.brand.accent,
          "--accent-soft": prospect.brand.accentSoft,
        } as CSSProperties
      }
    >
      <header className="border-b border-[#ded8d3] bg-white">
        <div className="flex min-h-9 items-center justify-center bg-[#111111] px-4 text-sm font-extrabold text-white md:justify-end md:px-14">
          <a href={prospect.phoneHref}>{prospect.phone}</a>
        </div>
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <a className="flex items-center gap-3" href="#assessment">
            {prospect.logoUrl ? (
              <img className="h-14 w-24 object-contain" src={prospect.logoUrl} alt={`${prospect.companyName} logo`} />
            ) : null}
            <span>
              <strong className="block text-base">{prospect.companyName}</strong>
              <small className="text-sm text-[#666666]">Storm damage inspection intake</small>
            </span>
          </a>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" className="h-10 justify-center rounded-lg">
              <a href="#assessment">
                Start assessment
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild className="h-10 justify-center rounded-lg bg-[var(--primary-dark)] !text-white hover:bg-[var(--primary-dark)]/90 [&_svg]:!text-white">
              <a href={prospect.phoneHref}>
                <Phone data-icon="inline-start" />
                {prospect.phone}
              </a>
            </Button>
          </div>
        </div>
      </header>
      <ChargerVariantSwitcher activeVariant="assessment" />

      <section className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 py-8 md:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.58fr)] md:py-12">
        <div className="min-w-0">
          <Badge className="mb-4 rounded-md bg-[var(--accent)] px-3 py-1 text-white hover:bg-[var(--accent)]">
            Free inspection assessment
          </Badge>
          <h1 className="mb-5 max-w-3xl break-words text-3xl font-black leading-[1.06] text-[#202124] sm:text-4xl md:text-5xl xl:text-6xl">
            <span className="hidden sm:inline">
              Check whether your San Antonio roof should be inspected after hail.
            </span>
            <span className="sm:hidden">
              Hail hit San Antonio?
              <br />
              Book a free roof check.
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#666666]">
            <span className="hidden sm:inline">
              Answer a few storm-damage questions, then request a free roof checkup from{" "}
              {prospect.companyName}. This demo turns Charger&apos;s educational hail page into a
              faster inspection-intake flow.
            </span>
            <span className="sm:hidden">
              Answer a few questions.
              <br />
              Request a free roof checkup from {prospect.companyName}.
            </span>
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-11 rounded-lg bg-[var(--accent)] px-5 !text-white hover:bg-[var(--accent)]/90 [&_svg]:!text-white">
              <a href="#assessment">
                Start roof assessment
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-lg px-5">
              <a href={prospect.phoneHref}>
                <Phone data-icon="inline-start" />
                {prospect.secondaryCta}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid gap-3 self-start">
          <Card className="rounded-lg border-[#ded8d3] bg-white shadow-[0_22px_70px_rgba(17,17,17,0.12)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ClipboardCheck className="size-5 text-[var(--accent)]" />
                What this assessment does
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-[#666666]">
              <p>
                <span className="hidden sm:inline">{prospect.pageAngle}</span>
                <span className="sm:hidden">
                  Start with a free roof checkup before deciding on repairs.
                </span>
              </p>
              <div className="grid gap-2">
                {prospect.inspectionIncludes.slice(0, 4).map((item, index) => (
                  <span className="flex items-start gap-2 font-semibold text-[#202124]" key={item}>
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                    <span className="hidden sm:inline">{item}</span>
                    <span className="sm:hidden">{mobileInspectionSummary[index]}</span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="assessment" className="border-y border-[#ded8d3] bg-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid gap-6">
            <Card className="rounded-lg border-[#ded8d3]">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-black uppercase text-[var(--primary)]">
                      Step 1
                    </p>
                    <CardTitle className="text-2xl">What happened?</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit rounded-md border-[#ded8d3]">
                    San Antonio hail intake
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  className="grid gap-3 md:grid-cols-2"
                  value={issueType}
                  onValueChange={(value) => {
                    setSubmitted(false);
                    setIssueType(value as typeof issueType);
                  }}
                >
                  {issueTypes.map((issue) => {
                    const Icon = issue.icon;

                    return (
                      <Label
                        className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#ded8d3] bg-white p-4 transition hover:border-[var(--accent)] has-[[data-state=checked]]:border-[var(--accent)] has-[[data-state=checked]]:bg-[var(--accent-soft)]"
                        htmlFor={issue.id}
                        key={issue.id}
                      >
                        <RadioGroupItem id={issue.id} value={issue.id} />
                        <Icon className="mt-0.5 size-5 shrink-0 text-[var(--primary)]" />
                        <span>
                          <strong className="block">{issue.label}</strong>
                          <small className="mt-1 block text-sm font-normal leading-5 text-[#666666]">
                            <span className="hidden sm:inline">{issue.description}</span>
                            <span className="sm:hidden">{issue.mobileDescription}</span>
                          </small>
                        </span>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="rounded-lg border-[#ded8d3]">
              <CardHeader>
                <p className="mb-2 text-xs font-black uppercase text-[var(--primary)]">Step 2</p>
                <CardTitle className="text-2xl">Which signs do you see?</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {prospect.damageSigns.map((sign) => (
                  <Label
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#ded8d3] p-4 transition hover:border-[var(--accent)]"
                    htmlFor={sign}
                    key={sign}
                  >
                    <Checkbox
                      checked={selectedSigns.includes(sign)}
                      id={sign}
                      onCheckedChange={() => toggleSign(sign)}
                    />
                    <span className="font-semibold leading-5">{sign}</span>
                  </Label>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-lg border-[#ded8d3]">
              <CardHeader>
                <p className="mb-2 text-xs font-black uppercase text-[var(--primary)]">Step 3</p>
                <CardTitle className="text-2xl">Request the free roof checkup</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="grid gap-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-3">
                    {contactFields.map((field) => (
                      <div className="grid gap-2" key={field.id}>
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input id={field.id} placeholder={field.placeholder} />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">What should the inspector know?</Label>
                    <Textarea
                      id="notes"
                      placeholder="Hail date, leak location, missing shingles, roof age, or anything else you noticed"
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="h-11 rounded-lg bg-[var(--accent)] px-5 !text-white hover:bg-[var(--accent)]/90 [&_svg]:!text-white" type="submit">
                      {prospect.recommendedCta}
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                    <Button asChild className="h-11 rounded-lg" variant="outline">
                      <a href={prospect.phoneHref}>
                        <Phone data-icon="inline-start" />
                        {prospect.secondaryCta}
                      </a>
                    </Button>
                  </div>
                </form>
                {submitted ? (
                  <div className="mt-4 rounded-lg border border-[#e7b4b8] bg-[#fff3f4] p-4 text-sm font-bold text-[#6f1018]">
                    Demo confirmation: this preview would send the inspection request to{" "}
                    {prospect.companyName}. No information was sent from this demo.
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          <aside className="grid gap-4 self-start lg:sticky lg:top-4">
            <Card className="rounded-lg border-[#111111] bg-[#202124] text-white shadow-[0_22px_70px_rgba(17,17,17,0.22)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Clock className="size-5 text-[var(--accent)]" />
                  Inspection summary
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Progress value={progress} />
                <div className="grid gap-3 text-sm">
                  <span className="rounded-lg bg-white/10 p-3">
                    <strong className="block text-white">Main concern</strong>
                    <small className="text-white/75">{selectedIssue.label}</small>
                  </span>
                  <span className="rounded-lg bg-white/10 p-3">
                    <strong className="block text-white">Visible signs selected</strong>
                    <small className="text-white/75">{selectedSigns.length || "None yet"}</small>
                  </span>
                  <span className="rounded-lg bg-white/10 p-3">
                    <strong className="block text-white">Recommended next step</strong>
                    <small className="text-white/75">{recommendation}</small>
                  </span>
                </div>
                <Separator className="bg-white/15" />
                <div className="grid gap-2 text-sm text-white/80">
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-[var(--accent)]" />
                    {prospect.serviceArea}
                  </span>
                  <span className="flex items-center gap-2">
                    <FileText className="size-4 text-[var(--accent)]" />
                    Photos and findings can guide next-step conversations.
                  </span>
                </div>
              </CardContent>
            </Card>

            <Accordion className="rounded-lg border border-[#ded8d3] bg-white px-4" type="single" collapsible>
              {prospect.faqs.slice(0, 3).map((faq) => (
                <AccordionItem value={faq.question} key={faq.question}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-[#666666]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </aside>
        </div>
      </section>
    </main>
  );
}
