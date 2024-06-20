import {Component, OnInit} from '@angular/core';



import { PrayerService } from '../prayer-times/prayer.service';
import { Prayer } from '../prayer-times/prayer.model';
import { RegionService } from '../prayer-times/region.service';
import { Region } from '../prayer-times/region.model';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-mawakit',
  templateUrl: './mawakit.component.html',
  styleUrls: ['./mawakit.component.css']
})
export class MawakitComponent implements OnInit {

  prayerTimes: Prayer[] = [];
  regions: Region[] = [];
  selectedRegion: string = '';

  constructor(private prayerService: PrayerService, private regionService: RegionService) { }

  ngOnInit(): void {
    this.getPrayerTimes();
    this.loadRegions();
  }

  getPrayerTimes(): void {
    this.prayerService.getPrayerTimes()
      .subscribe(prayerTimes => this.prayerTimes = prayerTimes);
  }

  loadRegions(): void {
    this.regionService.getRegions().subscribe(
      (regions: Region[]) => {
        this.regions = regions;
      },
      (error) => {
        console.error('Error fetching regions:', error);
      }
    );
  }

  search(): void {
    if (this.selectedRegion) {
      console.log('Searching for region:', this.selectedRegion);
      // Add your logic here to filter prayer times based on the selected region
    } else {
      console.log('Please select a region.');
    }
  }
}
