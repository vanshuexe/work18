'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { site } from '../../lib/site';

const interests = ['Bicycle parts', 'Agriculture parts', 'Custom / OEM manufacturing', 'Something else'];

export default function EnquiryForm() {
  const params = useSearchParams();
  const [state, setState] = useState({ status: 'idle', message: '' });
  const initialProduct = (params.get('product') || '').slice(0, 200);
  const requested = params.get('type') || '';
  const initialType = interests.includes(requested) ? requested : interests[0];

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: 'sending', message: '' });
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (response.ok) {
        form.reset();
        setState({ status: 'sent', message: result.message });
      } else {
        setState({ status: 'error', message: result.message });
      }
    } catch {
      setState({ status: 'error', message: `We could not send that. Please email ${site.email} or call ${site.phone.label}.` });
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="form-success" role="status">
        <h3>Thank you — we have your enquiry.</h3>
        <p>{state.message} Our team will reply by email or phone.</p>
        <button type="button" className="btn btn--dark" onClick={() => setState({ status: 'idle', message: '' })}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <div className="form-row">
        <label className="field">
          <span>Full name *</span>
          <input name="name" type="text" required maxLength={120} autoComplete="name" />
        </label>
        <label className="field">
          <span>Company</span>
          <input name="company" type="text" maxLength={160} autoComplete="organization" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>Email *</span>
          <input name="email" type="email" required maxLength={160} autoComplete="email" />
        </label>
        <label className="field">
          <span>Phone *</span>
          <input name="tel" type="tel" required maxLength={40} autoComplete="tel" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>I am enquiring about</span>
          <select name="interest" defaultValue={initialType}>
            {interests.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>City / country</span>
          <input name="location" type="text" maxLength={120} autoComplete="address-level2" />
        </label>
      </div>
      <div className="form-row">
        <label className="field">
          <span>Product code or name</span>
          <input name="product" type="text" maxLength={200} defaultValue={initialProduct} placeholder="e.g. HCI-120 Max DX" />
        </label>
        <label className="field">
          <span>Approx. quantity</span>
          <input name="quantity" type="text" maxLength={80} placeholder="e.g. 5,000 pieces / month" />
        </label>
      </div>
      <label className="field">
        <span>Requirement *</span>
        <textarea name="query" rows={6} required maxLength={4000} placeholder="Wheel size, finish, application, drawing or sample details…" />
      </label>
      <div className="form-trap" aria-hidden="true">
        <label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-foot">
        <button className="btn btn--primary" type="submit" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p>Or write to <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>
      {state.status === 'error' && <p className="form-error" role="alert">{state.message}</p>}
    </form>
  );
}
