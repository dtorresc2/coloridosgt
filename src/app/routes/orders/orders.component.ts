import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openScrollableContent(longContent, id) {
    this.modalService.open(longContent, { scrollable: true, size: 'lg', centered: true });
    console.log(id);
  }

  ngOnInit(): void {
  }

}
