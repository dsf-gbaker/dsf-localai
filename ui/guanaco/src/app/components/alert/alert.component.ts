import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

export enum AlertType {
  none    = 'none',
  success = 'success',
  warning = 'warning',
  error   = 'danger'
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {

  @Input({ required: true }) type: AlertType = AlertType.success;
  @Input({ required: true }) msg: string = '';
  @Output() dismiss: EventEmitter<any> = new EventEmitter();

  href = '';

  ngOnChanges(changes: SimpleChanges): void {
    
    if (!changes['type']) {
      return;
    }

    let curVal: AlertType = changes['type'].currentValue;

    if (!curVal) {
      return;
    }

    switch (curVal) {
      case AlertType.success:
        this.href = '#check-circle-fill';
        break;
      case AlertType.warning:
      case AlertType.error:
      default:
        this.href = '#exclamation-triangle-fill';
    }
    
  }

  getAlertStyle(): string {
    return 'alert-' + this.type.toString();
  }

  onClick() {
    this.dismiss.emit();
  }
}
