import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiCall} from '@models/api-call';
import {Subscription} from 'rxjs';
import {LaboratoriesService} from '@services/laboratories/laboratories.service';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit, OnDestroy {
  data: ApiCall;
  laboratoriesSubscriber: Subscription;

  constructor(private laboratoriesService: LaboratoriesService) { }

  ngOnInit(): void {
    this.laboratoriesSubscriber = this.laboratoriesService.getDataSubject().subscribe(
      (response) => this.data = response
    );
  }

  ngOnDestroy(): void {
    if (this.laboratoriesSubscriber) {
      this.laboratoriesSubscriber.unsubscribe();
    }
  }

}
