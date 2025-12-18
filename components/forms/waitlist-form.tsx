"use client";

import { useState } from "react";
import type { z } from "zod";
import { submitWaitlistAction } from "@/app/actions/waitlistActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WaitlistCreateSchema } from "@/schemas/waitlist.schema";

// Type inferred from Zod schema
type WaitlistFormData = z.infer<typeof WaitlistCreateSchema>;

export default function WaitlistForm({
  dict,
}: {
  dict: {
    title: string;
    description: string;
    form: {
      placeholders: Record<string, string>;
      labels: Record<string, string>;
      submit: string;
    };
    success: { title: string; message: string };
    error: string;
  };
}) {
  const [form, setForm] = useState<WaitlistFormData>({
    email: "",
    name: "",
    company: "",
    role: "",
    interest: "",
    importance: 3,
    source: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "number" || e.target.type === "range"
          ? Number(e.target.value)
          : e.target.value,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation using imported schema
    const result = WaitlistCreateSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues.map((issue) => issue.message).join(", "));
      return;
    }

    try {
      await submitWaitlistAction(result.data);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || dict.error);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 bg-card rounded-xl shadow-md text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {dict.success.title}
        </h2>
        <p className="text-muted-foreground">{dict.success.message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 bg-card text-card-foreground rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-foreground">{dict.title}</h2>
      <p className="text-muted-foreground text-sm">{dict.description}</p>

      {error && <div className="text-destructive text-sm">{error}</div>}

      <div className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder={dict.form.placeholders.email}
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          name="name"
          placeholder={dict.form.placeholders.name}
          value={form.name}
          onChange={handleChange}
        />
        <Input
          name="company"
          placeholder={dict.form.placeholders.company}
          value={form.company}
          onChange={handleChange}
        />
        <Input
          name="role"
          placeholder={dict.form.placeholders.role}
          value={form.role}
          onChange={handleChange}
        />
        <Input
          name="interest"
          placeholder={dict.form.placeholders.interest}
          value={form.interest}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <Label htmlFor="importance">{dict.form.labels.importance}</Label>
          <input
            id="importance"
            name="importance"
            type="range"
            min="1"
            max="5"
            value={form.importance}
            onChange={handleChange}
            className="w-full accent-secondary"
          />
        </div>

        <Input
          name="source"
          placeholder={dict.form.placeholders.source}
          value={form.source}
          onChange={handleChange}
        />
        <Textarea
          name="notes"
          placeholder={dict.form.placeholders.notes}
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {dict.form.submit}
      </Button>
    </form>
  );
}
