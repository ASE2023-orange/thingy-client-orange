import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-maintenance-mode',
  templateUrl: './maintenance-mode.component.html',
  styleUrls: ['./maintenance-mode.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 , padding: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-out'))
    ])
  ]
})
export class MaintenanceModeComponent implements OnInit, OnDestroy {
  @Input() plantID!: string;

  Object = Object;
  maintenanceStatus: any = {};
  
  subscription: Subscription = new Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchMaintenanceStatus();
    this.subscription = interval(3000).subscribe(() => {
      this.fetchMaintenanceStatus();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchMaintenanceStatus() {
    this.dataService.getMaintenanceStatus(this.plantID).subscribe(
      (data: { in_maintenance: boolean }) => {
        this.maintenanceStatus = data.in_maintenance
      }
    )
  }
}
