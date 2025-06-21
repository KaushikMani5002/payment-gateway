import { Component, OnInit, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { FormatIndianRupee } from '../../pipes/formatIndianRupee.pipe';
import { FormControl } from '@angular/forms';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

interface TransactionData {
  date: Date,
  recipientName: string | undefined,
  recipientUpiID: string | undefined,
  notes: string | undefined, 
  amount: number | undefined,
  status: string
}

@Component({
  selector: 'app-transactions',
  imports: [MatTableModule, MatPaginatorModule, DatePipe, FormatIndianRupee, ReactiveFormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})

export class Transactions implements OnInit, AfterViewInit {
  
  commonService: CommonService = inject(CommonService);
  headers: Array<String> = ['date', 'recipientName', 'recipientUpiID', 'notes', 'amount', 'status'];
  transactions = new MatTableDataSource<TransactionData>([]);
  search: FormControl<string> = new FormControl('', {nonNullable: true});
  searchResults = new MatTableDataSource<TransactionData>([]); 
  searchInProgress: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    let all_transactions = this.commonService.transactionsDetails;
    if(all_transactions){
      all_transactions.transactions.forEach(data => {
        const transaction = {
          date: data.date,
          recipientName: data.receiver_name,
          recipientUpiID: data.receiver_vpa,
          notes: data.transaction_notes,
          amount: data.amount,
          status: data.status
        };
        this.transactions.data = [...this.transactions.data, transaction]
      });
    }
    // Search
    this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => {
      this.searchInProgress = !!data;
      const result = this.transactions.data.filter(ele => {
        return (
          ele.recipientName?.includes(data) || ele.notes?.includes(data) || ele.recipientUpiID?.includes(data)
        );
      });
      this.searchResults.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.transactions.paginator = this.paginator;
  }
}
