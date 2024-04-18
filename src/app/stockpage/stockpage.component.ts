import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-stockpage',
  
  templateUrl: './stockpage.component.html',
  styleUrl: './stockpage.component.css'
})
export class StockpageComponent implements OnInit {
  stockData: any;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStockData().subscribe((data: any) => {
      
      this.stockData = data;
    });
  }

  objectKeys(obj: any) {
    return Object.keys(obj);
  }
}
