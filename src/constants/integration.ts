type IntegrationsListItemProps = {
    id: string
    name: 'stripe'
    logo: string
    description: string
    title: string
    modalDescription: string
  }
  
  export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
    {
      id: '1',
      name: 'stripe',
      description:
        'Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.',
      logo: '54526bb2-e842-490d-8a8a-3f28b23e71b2',
      title: 'Connect Stripe Account',
      modalDescription:
        'The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.',
    },
  ]