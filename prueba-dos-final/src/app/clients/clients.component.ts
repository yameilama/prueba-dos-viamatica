import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ContractService } from './contract/service/contract.service';
import { NotificationService } from '../shared/notification.service';
import { AttentionService } from '../shared/attention.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  username: string | null = '';
  contracts: any[] = [];
  attentions: any[] = [];
  message: string | null = null;


  constructor(private authService: AuthService, private contractService: ContractService, private notificationService: NotificationService, private attentionService: AttentionService) { }

  ngOnInit() {
    this.username = this.authService.getLoggedInUser();
    this.fetchContracts();
    this.fetchAttentions();
    this.notificationService.currentMessage.subscribe(message => this.message = message);

  }

  fetchAttentions() {
    this.attentionService.getMyAttentions().subscribe({
      next: (attentions) => {
        this.attentions = attentions;
        console.log('Attention fetched: ', attentions);
      },
      error: (error) => {
        console.error('Error fetching attentions', error);
      },
    });
  }

  fetchContracts() {
    this.contractService.getContractsForLoggedInUser().subscribe({
      next: (contracts) => {
        this.contracts = contracts;
      },
      error: (error) => {
        console.error('Error fetching contracts', error);
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.notificationService.clearMessage();

  }
}
