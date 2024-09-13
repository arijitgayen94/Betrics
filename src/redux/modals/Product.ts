interface ProductModal {
  product_id: string;
  name: string;
  price_id: string;
  amount: number;
  type: string;
  recurring: {
    aggregate_usage: any;
    interval: string;
    interval_count: number;
    trial_period_days: any;
    usage_type: string;
  };
  description: string;
  images: string;
  is_trail: boolean;
  trial_days: string;
}

interface CheckoutProductModal {
  price_id: string;
  card_number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  coupon: any;
}

interface SubscribedProductModal {
  amount: number;
  image: string;
  interval: string;
  interval_count: number;
  is_trial: boolean;
  name: string;
  next_invoice_date: string;
  period_end: string;
  period_start: string;
  status: boolean;
  trial_end: any;
  trial_period_days: any;
  trial_start: any;
}

export type {ProductModal, CheckoutProductModal, SubscribedProductModal};
