// types/service.ts
export type ServiceItem = {
  id: number;
  title: string; // service_name as title
  subtitle: string; // service_detail as subtitle
  price: number;
  picture?: string | null;
  // อนาคต: category?: string
};
