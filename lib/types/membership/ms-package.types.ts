export interface MembershipPackage {
  id: number;
  title: string;
  description: string[];
  status?: string;
  categoryInfo: {
    category: string;
    originalPrice: number;
    sellPrice: number;
  };
}
