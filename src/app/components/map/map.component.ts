import {Component, OnDestroy, OnInit} from '@angular/core';
import {Map, LayerGroup, tileLayer, latLng, latLngBounds, icon, marker} from 'leaflet';
import {LaboratoriesService} from '@services/laboratories/laboratories.service';
import {Cords} from '@models/cords';
import {Laboatoria} from '@models/laboatoria';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  laboratoriesSubscriber: Subscription;
  markerLayer: LayerGroup = new LayerGroup<any>();
  map: Map;
  laboratories: Laboatoria[];
  cords: Cords;

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 15,
    center: latLng([52.229958, 21.012008])
  };

  constructor(private laboratoriesService: LaboratoriesService) {
  }

  ngOnInit(): void {
    this.initSubscription();
  }

  ngOnDestroy(): void {
    if (this.laboratoriesSubscriber) {
      this.laboratoriesSubscriber.unsubscribe();
    }
  }

  initSubscription(): void {
    this.laboratoriesSubscriber = this.laboratoriesService.getDataSubject().subscribe(
      (response) => {
        this.laboratories = response.laboatoria;
        this.cords = response.cords;
        this.setLocation();
        this.setLaboratories();
      }
    );
  }

  setLaboratories(): void {
    this.markerLayer.clearLayers();
    this.laboratories.forEach(lab => {
      const position = latLng(lab.gps_lat, lab.gps_lng);
      const markerPosition = marker(position, {
        icon: icon({
          iconSize: [30, 46],
          iconAnchor: [13, 41],
          shadowSize: [0, 0],
          iconUrl: 'assets/marker-icon.png'
        })
      }).addTo(this.markerLayer);
      let template = '<div class="text-center"><b> ' + lab.nazwa + '</b> </br>' +
        ' <b> Adres: ' + lab.adres + '</b> </br> ';

      if (lab.info) {
        template = template + '<b> Info: ' + lab.info + '</b> </div>';
      }

      markerPosition.bindPopup(template, {
        offset: [2, -15]
      });
    });
    this.markerLayer.addTo(this.map);
  }

  setLocation(): void {
    this.markerLayer.clearLayers();
    const minLngLat = latLng(this.cords.min_lat, this.cords.min_lng);
    const maxLngLat = latLng(this.cords.max_lat, this.cords.max_lng);
    const position = latLngBounds(maxLngLat, minLngLat);
    this.map.flyToBounds(position);
    this.markerLayer.addTo(this.map);
  }

  onMapReady(map: Map): void {
    this.map = map;
  }

}
