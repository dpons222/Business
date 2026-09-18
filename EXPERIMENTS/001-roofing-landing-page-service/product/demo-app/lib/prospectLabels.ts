export const relationshipStatusLabels: Record<string, string> = {
  not_contacted: "Not contacted",
  contacted: "Contacted",
  do_not_contact: "Do not contact",
  not_interested: "Not interested",
  follow_up_1_due: "Follow-up 1 due",
  follow_up_1_sent: "Follow-up 1 sent",
  follow_up_2_due: "Follow-up 2 due",
  follow_up_2_sent: "Follow-up 2 sent",
  positive_reply: "Positive reply",
  neutral_reply: "Neutral reply",
  negative_reply: "Negative reply",
  call_booked: "Call booked",
  won: "Won",
  lost: "Lost",
  not_fit: "Not fit",
};

export function relationshipStatusLabel(status: string | null) {
  if (!status) {
    return "No contact status";
  }

  return relationshipStatusLabels[status] ?? status;
}
