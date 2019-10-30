import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  private REST_API_SERVER = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    console.log(formData)
    console.log( this.httpClient.get(this.REST_API_SERVER +
      '/company/byUrl?url=' + formData.url +
      '&supplierId=' + formData.supplierId +
      '&type=' + formData.type ).subscribe());
  }

}
