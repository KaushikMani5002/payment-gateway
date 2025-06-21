import { Component, inject, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, timer } from 'rxjs';
import { OnlyNumberDirective } from '../../directives/onlynumber.directive';
import { CommonService } from '../../services/common.service';
import { JsonPipe } from '@angular/common';

enum PaymentStatus {
  uninitialized = 'NOT_STARTED',
  success = 'SUCCESS',
  pending = 'IN_PROGRESS',
  failure = 'FAILED'
}

interface UPIPaymentForm {
  sender_vpa: FormControl<string>,
  receiver_vpa: FormControl<string>
  receiver_name: FormControl<string>,
  amount: FormControl<number>,
  transaction_notes: FormControl<string>
}

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, OnlyNumberDirective],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  transactionInProgress: BehaviorSubject<boolean> = new BehaviorSubject(false);
  formSubmitted: BehaviorSubject<boolean> = new BehaviorSubject(false);
  commonService: CommonService = inject(CommonService);
  currentTransactionStatus: PaymentStatus = PaymentStatus.uninitialized;
  showLoader: boolean = false;


  paymentForm: FormGroup<UPIPaymentForm> = new FormGroup<UPIPaymentForm>({
    sender_vpa: new FormControl('', {
      validators: [Validators.required, this.upiValidator],
      nonNullable: true,
      updateOn: 'blur'
    }),
    receiver_vpa: new FormControl('', {
      validators: [Validators.required, this.upiValidator],
      nonNullable: true,
      updateOn: 'blur'
    }),
    receiver_name: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
      updateOn: 'blur'
    }),
    amount: new FormControl(1, {
      validators: [Validators.required, Validators.min(1), Validators.max(100000)],
      nonNullable: true,
      updateOn: 'blur'
    }),
    transaction_notes: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
      updateOn: 'blur'
    })
  });

  upiPIN: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    nonNullable: true,
    updateOn:'blur'
  });

  upiValidator(field: AbstractControl): ValidationErrors | null {
    let value = field.value;
    const upi_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/;
    const valid = upi_regex.test(value) && value.length <= 45;
    if(!valid){
      return {
        invalid_upi: true
      };
    }
    return null;
  }

  private modalService: NgbModal = inject(NgbModal);

  imageLoaded: boolean = false;

  onImageLoad(){
    this.imageLoaded = true;
  }

  initiatePayment(modal: TemplateRef<any>){
    // Fallback (just in case fields don't clear)
    this.modifyFields(false);
    this.currentTransactionStatus = PaymentStatus.pending;
    this.modalService.open(modal, { size: 'lg', centered: true, backdrop: 'static' }).dismissed.subscribe((data) => {
      this.onModalClose();
    });
  }

  onModalClose() {
    this.paymentForm.reset();
    this.modifyFields(false);
    this.transactionInProgress.next(false);
    this.formSubmitted.next(false);
    this.showLoader = false;
    this.currentTransactionStatus = PaymentStatus.uninitialized;
  }

  pay(){
    if(!this.formSubmitted.value){
      // Show UPI pin with delay
      this.transactionInProgress.next(true);
      this.showLoader = true;
      this.modifyFields(true);
      // Mock Delay
      timer(2000).subscribe(data => {
        this.transactionInProgress.next(false);
        this.formSubmitted.next(true);
        this.showLoader = false;
      });
    } else {
      // Store data and proceed
      this.showLoader = true;
      if(confirm('Proceed with this transaction?')){
        this.currentTransactionStatus = PaymentStatus.success;
      } else {
        this.currentTransactionStatus = PaymentStatus.failure;
      }
      this.storeData();
      this.showLoader = false;
    }
  }

  modifyFields(disable: boolean){
    for(let control in this.paymentForm.controls){
      let element = this.paymentForm.get(control);
      if(!!element){
        disable ? element.disable() : element.enable();
      }
    }
  }

  // Getter Functions
  get sender_vpa(){
    return this.paymentForm.get('sender_vpa');
  }

  get receiver_name(){
    return this.paymentForm.get('receiver_name');
  }

  get receiver_vpa(){
    return this.paymentForm.get('receiver_vpa');
  }

  get amount(){
    return this.paymentForm.get('amount');
  }

  get transaction_notes(){
    return this.paymentForm.get('transaction_notes');
  }

  private storeData(){
    const transactionDetails = {
      ...this.paymentForm.value,
      date: new Date(),
      status: this.currentTransactionStatus
    };
    this.commonService.updateTransactionDetails = transactionDetails;
    return true;
  }

}
