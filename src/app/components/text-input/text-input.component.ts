import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {LaboratoriesService} from '@services/laboratories/laboratories.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, OnDestroy {
  private urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  urlForm: FormGroup;
  buttonText: string;
  isFetching = false;
  dataSubscriber: Subscription;

  constructor(private laboratoriesService: LaboratoriesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.urlForm = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern(this.urlRegex)]]
    });
    this.buttonText = 'Pobierz';
  }

  ngOnDestroy(): void {
    if (this.dataSubscriber){
      this.dataSubscriber.unsubscribe();
    }
  }

  fetchData(): void {
    this.isFetching = true;
    this.buttonText = 'Proszę czekać...';
    this.dataSubscriber = this.laboratoriesService.getData(this.url.value).subscribe(
      (response) => {
        this.isFetching = false;
        this.buttonText = 'Pobierz';
      },
      (error) => {
        this.isFetching = false;
        this.buttonText = 'Pobierz';
      }
    );
  }

  get url() {
    return this.urlForm.get('url');
  }
}
