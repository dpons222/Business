"use client";

import { useState } from "react";

type DemoLeadFormProps = {
  companyName: string;
  formTitle: string;
  formNote: string;
  ctaLabel: string;
};

export function DemoLeadForm({ companyName, formTitle, formNote, ctaLabel }: DemoLeadFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      id="inspection-form"
      className="hero-estimate-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <p className="inspection-label">Request inspection</p>
      <h2>{formTitle}</h2>
      <div className="form-grid">
        <label>
          First Name
          <input type="text" name="firstName" placeholder="First name" />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" placeholder="Last name" />
        </label>
        <label>
          Phone Number
          <input type="tel" name="phone" placeholder="Best phone number" />
        </label>
        <label>
          Email Address
          <input type="email" name="email" placeholder="Email address" />
        </label>
      </div>
      <label>
        Property ZIP Code
        <input type="text" name="zip" placeholder="Property ZIP code" />
      </label>
      <label>
        What are you seeing?
        <textarea name="issue" placeholder="Hail, leak, missing shingles, or not sure yet" />
      </label>
      <button type="submit" className="button button-primary full-width">
        {ctaLabel}
      </button>
      <small>{formNote}</small>
      {submitted ? (
        <p className="demo-confirmation" role="status">
          Demo confirmation: this preview would send the inspection request to {companyName}. No
          information was sent from this demo.
        </p>
      ) : null}
    </form>
  );
}
