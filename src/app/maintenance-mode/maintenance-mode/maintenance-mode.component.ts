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
  @Input() plantThingyID!: string;

  Object = Object;
  maintenanceStatus = false; 
  
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
    this.dataService.getMaintenanceStatus(this.plantThingyID).subscribe(
      (data: { maintenance_status: boolean }) => {
        this.maintenanceStatus = data.maintenance_status
      }
    )
  }
}
