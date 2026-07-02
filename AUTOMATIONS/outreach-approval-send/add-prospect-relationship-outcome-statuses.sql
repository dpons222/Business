alter table public.prospects
  drop constraint if exists prospects_status_check;

alter table public.prospects
  add constraint prospects_status_check
  check (
    status in (
      'not_contacted',
      'contacted',
      'do_not_contact',
      'not_interested',
      'follow_up_1_due',
      'follow_up_1_sent',
      'follow_up_2_due',
      'follow_up_2_sent',
      'positive_reply',
      'neutral_reply',
      'negative_reply',
      'call_booked',
      'won',
      'lost',
      'not_fit'
    )
  );

comment on column public.prospects.status is
  'Relationship/contact lifecycle for the prospect: not_contacted = eligible and unsent; contacted = outbound message sent; do_not_contact = internal decision not to pursue; not_interested = prospect indicated no interest; other values track follow-up and pipeline outcomes.';
