export interface INFTListItem {
    id: number;
    slug: string;
    display_name: string;
    img: string;
    floor_price: number;
    history_data_table: string;
    uasset_contract_address: string;
    variation_eth: number;
    type: string;
    url: string;
    uName: string;
  }


  export interface INFTDetail {
  id: number;
  slug: string;
  description?: string
  name: string;
  display_name: string;
  img: string;
  floor_price: number;
  total_supply: number;
  num_owners: number;
  total_volume: number;
  "24h_volume"?: number;
  belong: any;
  bought: number;
  in_hold: number;
  history_data_table: string;
  asset_address: string;
  uasset_contract_address: string;
  variation_eth: number;
  type: string;
  count_onsale: number;
  listed_ratio: number;
  url: string;
  uName: string;
  }


  export interface Isales {
    id: number;
    num_sales_24h: number;
    num_sales_24h_variation: number;
    sales_24h_volume: number;
    sales_24h_volume_variation: number;
    sales_7d_avg_price: number;
    sales_7d_avg_price_variation: number;
    sales_7d_highest_price: number;
    sales_7d_highest_price_variation: number;
    sales_7d_lowest_price: number;
    sales_7d_lowest_price_variation: number;
  }
