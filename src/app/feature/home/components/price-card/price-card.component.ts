import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { priceCard } from 'src/app/feature/home/models/price-card.models';
import { HomeService } from './../../services/home.service';

// import Swiper core and required modules
import SwiperCore, { Pagination, SwiperOptions } from "swiper";
// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PriceCardComponent implements OnInit {

  @Input() stockData: priceCard[] | undefined;

  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 8,
    pagination: { clickable: true },
    breakpoints: {
      '640': {
        slidesPerView: 5,
        spaceBetween: 8
      },
      '768': {
        slidesPerView: 6,
        spaceBetween: 8
      },
      '1024': {
        slidesPerView: 7,
        spaceBetween: 8
      },
      '1280': {
        slidesPerView: 8,
        spaceBetween: 8
      }
    }
  };

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getKeyIndices();
  }

  async getKeyIndices() {
    this.stockData = await lastValueFrom(this.homeService.getKeyIndices());
  }
}


