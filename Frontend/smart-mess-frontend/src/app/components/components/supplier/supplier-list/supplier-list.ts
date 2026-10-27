import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../../../services/services/supplier';
import { Supplier } from '../../../../models/models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.css'
})
export class SupplierList implements OnInit {
  suppliers: Supplier[] = [];
  loading: boolean = false;
  showModal: boolean = false;
  newSupplier: Partial<Supplier> = {
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    category: 'Grains & Groceries',
    isActive: true
  };

  constructor(
    private supplierService: SupplierService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.supplierService.getAll().subscribe({
      next: (data) => {
        this.suppliers = data || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load suppliers', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  openModal(): void {
    this.newSupplier = {
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      category: 'Grains & Groceries',
      isActive: true
    };
    this.showModal = true;
    this.cdr.markForCheck();
  }

  closeModal(): void {
    this.showModal = false;
    this.cdr.markForCheck();
  }

  saveSupplier(): void {
    if (!this.newSupplier.name) return;
    this.supplierService.create(this.newSupplier as Supplier).subscribe({
      next: () => {
        this.closeModal();
        this.loadSuppliers();
      },
      error: (err) => {
        alert('Failed to create supplier');
        this.cdr.markForCheck();
      }
    });
  }

  deleteSupplier(id: number): void {
    if (!confirm('Are you sure you want to remove this supplier?')) return;
    this.supplierService.delete(id).subscribe({
      next: () => this.loadSuppliers(),
      error: (err) => {
        alert('Failed to delete supplier');
        this.cdr.markForCheck();
      }
    });
  }
}
