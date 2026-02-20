'use client'
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Send } from 'lucide-react';

function ContactForm() {
  const [state, handleSubmit] = useForm("maqddbnb");

  if (state.succeeded) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-primary">Thanks for your message!</h2>
        <p className="text-muted-foreground mt-2">I'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Name</label>
          <Input id="name" type="text" name="name" placeholder="John Doe" required />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-destructive text-sm font-medium" />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Email</label>
          <Input id="email" type="email" name="email" placeholder="john.doe@example.com" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-destructive text-sm font-medium" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject</label>
        <Input id="subject" type="text" name="subject" placeholder="Let's talk about..." required />
        <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-destructive text-sm font-medium" />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
        <Textarea id="message" name="message" placeholder="Your message here..." className="min-h-[150px]" required />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-destructive text-sm font-medium" />
      </div>
      <div className="text-center">
        <Button type="submit" disabled={state.submitting} className="w-full md:w-auto">
          {state.submitting ? 'Sending...' : 'Send Message'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

export default function ContactSection() {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Ready to Scale Your Data Vision?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                I'm currently open to new opportunities and collaborations on high-performance cloud architectures. 
                Let's connect and build the future of data, together.
            </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-lg">
              <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
