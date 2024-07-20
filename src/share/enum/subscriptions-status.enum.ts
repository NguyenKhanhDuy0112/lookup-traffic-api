export enum SubscriptionStatusEnum {
  SUBSCRIPTION = 1,
  UNSUBSCRIPTION = 2,
}

export const SubscriptionStatusDisplay = [
  { id: SubscriptionStatusEnum.SUBSCRIPTION, name: 'Follow' },
  { id: SubscriptionStatusEnum.UNSUBSCRIPTION, name: 'UnFollow' },
];
