import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {

  constructor() { }

  @Input() title = 'Dikkat';
  @Input() message = '';

  ngOnInit(): void {
  }

}
