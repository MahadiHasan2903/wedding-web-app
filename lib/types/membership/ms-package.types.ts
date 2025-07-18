export interface MembershipPackage {
  id: number;
  title: string;
  description: string;
  priceOption: {
    category: string;
    originalPrice: number;
    sellPrice: number;
  };
}
