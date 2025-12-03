export type TFeedData = {
  orders?: {
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    ingredients: string[];
  }[];
  total: number;
  totalToday: number;
  isLoading?: boolean;
  error?: string | null;
};

export type FeedInfoUIProps = {
  feed: TFeedData;
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};
