import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AttentionService } from '../../shared/attention.service';
import { Attention } from '../../models/attention.model';
import { Router } from '@angular/router';
import { AttentionType } from '../../models/attention-type.model';
import { AttentionTypeService } from '../../shared/ticket-type.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent implements OnInit {
  ticketTypes: AttentionType[] = [];
  attentionTypeId: number | null = null;


  constructor(private attentionTypeService: AttentionTypeService,
    private location: Location, private attentionService: AttentionService,
    private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.attentionTypeService.getAllTicketTypes().subscribe({
      next: (types) => {
        this.ticketTypes = types;
        console.log("Ticket types:", this.ticketTypes);
      },
      error: (err) => console.error(err)
    });
  }


  goBack(): void {
    this.location.back();
  }

  onSelectType(): void {
    console.log('Selected attention type ID:', this.attentionTypeId);
  }


  generateAttention(): void {
    if (this.attentionTypeId != null) {

      const attention: Attention = {

        attentionTypeId: this.attentionTypeId,
      };
      console.log('Sending request with payload:', attention);
      this.attentionService.createAttention(attention).subscribe({
        next: (newAttention) => {
          console.log(newAttention);
          this.notificationService.setMessage('El turno se generó correctamente');
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.error('Attention type is not selected.');
    }
  }


}
