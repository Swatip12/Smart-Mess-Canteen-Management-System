export interface InventoryItem {
  id?: number;
  name: string;
  category?: 'GRAINS' | 'DAIRY' | 'VEGETABLES' | 'SPICES' | 'OILS' | 'BEVERAGES' | 'PACKAGED' | 'OTHER' | string;
  quantity: number;
  unit: string;
  minimumThreshold?: number;
  unitCost?: number;
  mess?: any;
  messId?: number;
  lastRestockedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isLowStock?: boolean;
}

export interface StockMovement {
  id?: number;
  inventoryItemId?: number;
  inventoryItem?: InventoryItem;
  type: 'PURCHASE' | 'CONSUMPTION' | 'WASTAGE' | 'ADJUSTMENT' | string;
  quantity: number;
  reason?: string;
  performedBy?: string;
  movementDate?: string;
}
