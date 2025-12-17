"use client";

import { useState } from "react";
import { submitWaitlistAction } from "@/app/actions/waitlistActions";
import { Button, Input, Label, Textarea } from "@/components/ui";

export function WaitlistForm() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    company: "",
    role: "",
    interest: "",
    importance: "3",
    source: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await submitWaitlistAction({
        ...form,
        importance: Number(form.importance), // convert slider value to number
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to submit waitlist signup");
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-card rounded-xl shadow-lg text-center space-y-4">
        <h2 className="text-2xl font-bold">You&apos;re on the list!</h2>
        <p className="text-muted-foreground">
          Thanks for your interest. We&apos;ll reach out soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 bg-card text-card-foreground rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-foreground">
        Join the Waitlist 🚀
      </h2>
      <p className="text-muted-foreground text-sm">
        Get notified when Bill AI launches — and help shape the future of
        automated billing.
      </p>

      {error && <div className="text-destructive text-sm">{error}</div>}

      <div className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
        />
        <Input
          name="role"
          placeholder="Your Role"
          value={form.role}
          onChange={handleChange}
        />
        <Input
          name="interest"
          placeholder="Area of Interest (e.g., invoicing, insights)"
          value={form.interest}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <Label htmlFor="importance">How important is this to you?</Label>
          <input
            id="importance"
            name="importance"
            type="range"
            min="1"
            max="5"
            value={form.importance}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <Input
          name="source"
          placeholder="How did you hear about us?"
          value={form.source}
          onChange={handleChange}
        />
        <Textarea
          name="notes"
          placeholder="Anything else you'd like us to know?"
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Join Waitlist
      </Button>
    </form>
  );
}
