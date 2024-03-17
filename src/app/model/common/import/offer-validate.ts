export class OfferValidate {
  budgetId: number;
  guid: string;
  accepted: boolean;
  reason: string;

  constructor(
    budgetId: number,
    accepted: boolean,
    reason: string,
    guid: string
  ) {
    this.budgetId = budgetId;
    this.accepted = accepted;
    this.reason = reason;
    this.guid = guid;
  }
}
