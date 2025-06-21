import { Injectable } from "@angular/core";

interface Transaction {
    date: Date
    status: string
    sender_vpa?: string | undefined
    receiver_vpa?: string | undefined
    receiver_name?: string | undefined
    amount?: number | undefined
    transaction_notes?: string | undefined
}

interface TransactionFromDB {
    transactions: Transaction[]
}

@Injectable({
    providedIn: 'root'
})

export class CommonService {

    public get isLoggedIn(){
        return this.getItem('isLoggedIn');
    }

    public set updateLoginStatus(state: boolean){
        this.setItem('isLoggedIn', state);
    }

    public set updateTransactionDetails(transaction: Transaction) {
        let transactionData = this.getItem('transactions');

        if (!transactionData) {
            // If no transactions data, create an object with the first transaction
            const newData = { transactions: [transaction] };
            this.setItem('transactions', JSON.stringify(newData));
        } else {
            // Parse existing data
            const parsedData = JSON.parse(transactionData);
            parsedData.transactions.push(transaction);
            this.setItem('transactions', JSON.stringify(parsedData));
        }
    }

    public get transactionsDetails(): TransactionFromDB {
        const data = this.getItem('transactions');
        if(data){
            return JSON.parse(data);
        }
        return { transactions: []}
    }

    destroySession(){
        sessionStorage.clear();
    }

    private getItem(key: string){
        return sessionStorage.getItem(key);
    }

    private setItem(key: string, value: any){
        sessionStorage.setItem(key, value);
    }
}