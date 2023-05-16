import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonFormData } from './components/json-form/json-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dynamicFormTest';
  public formData!: JsonFormData;
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    console.log("ngoninit");
    this.http.get('../assets/my-form.json').subscribe((formData) => {
        this.formData = formData as JsonFormData;
        console.log(this.formData);
      });
  }
}
