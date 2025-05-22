import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Beneficiary } from '../../admin/models/beneficiary.model';
import { BankAccount } from '../../admin/models/bank-account.model';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    RouterModule
  ]
})
export class BeneficiaryComponent implements OnInit {
  clientId: string | null = null;
  beneficiaries$!: Observable<Beneficiary[]>;
  accounts$!: Observable<BankAccount[]>;
  newBeneficiary: Beneficiary = { rib: '', name: '', accountId: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  displayedColumns: string[] = ['name', 'rib', 'accountId'];

  constructor(
    private accountsService: AccountsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId');
    console.log('BeneficiaryComponent clientId:', this.clientId);
    if (!this.clientId) {
      this.errorMessage = 'Please log in to continue';
      return;
    }
    this.loadBeneficiaries();
    this.loadAccounts();
  }

  loadBeneficiaries(): void {
    this.beneficiaries$ = this.accountsService.getBeneficiaries(this.clientId!).pipe(
      catchError(err => {
        this.errorMessage = err.message || 'Failed to load beneficiaries';
        return throwError(() => err);
      })
    );
  }

  loadAccounts(): void {
    this.accounts$ = this.accountsService.getAccountsByClientId(this.clientId!).pipe(
      catchError(err => {
        this.errorMessage = err.message || 'Failed to load accounts';
        return throwError(() => err);
      })
    );
  }

  addBeneficiary(): void {
    if (!this.newBeneficiary.name || !this.newBeneficiary.rib || !this.newBeneficiary.accountId) {
      this.errorMessage = 'Name, RIB, and Account are required';
      return;
    }
    this.accountsService.addBeneficiary(this.clientId!, this.newBeneficiary).subscribe({
      next: () => {
        this.successMessage = 'Beneficiary added successfully';
        this.newBeneficiary = { rib: '', name: '', accountId: '' };
        this.loadBeneficiaries();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to add beneficiary';
        this.successMessage = null;
      }
    });
  }
}
