import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../../../services/services/inventory';
import { MessService } from '../../../../services/services/mess';
import { InventoryItem, StockMovement } from '../../../../models/models/inventory-item.model';
import { Mess } from '../../../../models/models/mess.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.css'
})
export class InventoryList implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  messes: Mess[] = [];
  
  selectedCategory: string = 'ALL';
  showLowStockOnly: boolean = false;
  searchQuery: string = '';

  // Add Item Modal State
  showAddModal: boolean = false;
  newItem: Partial<InventoryItem> = {
    name: '',
    category: 'GRAINS',
    quantity: 0,
    unit: 'KG',
    minimumThreshold: 10,
    unitCost: 0
  };

  // Movement Modal State
  showMovementModal: boolean = false;
  selectedItemForMovement: InventoryItem | null = null;
  movementData: Partial<StockMovement> = {
    type: 'CONSUMPTION',
    quantity: 1,
    reason: '',
    performedBy: 'Admin'
  };

  categories: string[] = ['GRAINS', 'DAIRY', 'VEGETABLES', 'SPICES', 'OILS', 'BEVERAGES', 'PACKAGED', 'OTHER'];

  constructor(
    private inventoryService: InventoryService,
    private messService: MessService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadMesses();
  }

  loadItems(): void {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.items = data || [];
        this.filterItems();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load inventory items', err);
        this.cdr.markForCheck();
      }
    });
  }

  loadMesses(): void {
    this.messService.getAll().subscribe({
      next: (data) => {
        this.messes = data || [];
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load messes', err);
        this.cdr.markForCheck();
      }
    });
  }

  filterItems(): void {
    let result = this.items;

    if (this.selectedCategory !== 'ALL') {
      result = result.filter(i => i.category === this.selectedCategory);
    }

    if (this.showLowStockOnly) {
      result = result.filter(i => (i.quantity || 0) <= (i.minimumThreshold || 10));
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(i => i.name.toLowerCase().includes(q));
    }

    this.filteredItems = result;
    this.cdr.markForCheck();
  }

  getLowStockCount(): number {
    return this.items.filter(i => (i.quantity || 0) <= (i.minimumThreshold || 10)).length;
  }

  openAddModal(): void {
    this.newItem = {
      name: '',
      category: 'GRAINS',
      quantity: 0,
      unit: 'KG',
      minimumThreshold: 10,
      unitCost: 0,
      messId: this.messes.length > 0 ? this.messes[0].id : undefined
    };
    this.showAddModal = true;
    this.cdr.markForCheck();
  }

  closeAddModal(): void {
    this.showAddModal = false;
    this.cdr.markForCheck();
  }

  saveNewItem(): void {
    if (!this.newItem.name || this.newItem.quantity === undefined) return;

    this.inventoryService.create(this.newItem as InventoryItem).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadItems();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to create inventory item');
        this.cdr.markForCheck();
      }
    });
  }

  openMovementModal(item: InventoryItem, defaultType: string = 'CONSUMPTION'): void {
    this.selectedItemForMovement = item;
    this.movementData = {
      type: defaultType,
      quantity: 1,
      reason: defaultType === 'CONSUMPTION' ? 'Kitchen meal preparation' : 'Fresh market replenishment',
      performedBy: localStorage.getItem('adminName') || 'Admin'
    };
    this.showMovementModal = true;
    this.cdr.markForCheck();
  }

  closeMovementModal(): void {
    this.showMovementModal = false;
    this.selectedItemForMovement = null;
    this.cdr.markForCheck();
  }

  submitMovement(): void {
    if (!this.selectedItemForMovement || !this.selectedItemForMovement.id || !this.movementData.quantity) return;

    this.inventoryService.recordMovement(this.selectedItemForMovement.id, this.movementData as StockMovement).subscribe({
      next: () => {
        this.closeMovementModal();
        this.loadItems();
      },
      error: (err) => {
        alert(err.error?.message || 'Failed to record stock movement');
        this.cdr.markForCheck();
      }
    });
  }

  deleteItem(id: number): void {
    if (!confirm('Are you sure you want to delete this inventory item?')) return;
    this.inventoryService.delete(id).subscribe({
      next: () => this.loadItems(),
      error: (err) => {
        alert('Failed to delete item');
        this.cdr.markForCheck();
      }
    });
  }
}
