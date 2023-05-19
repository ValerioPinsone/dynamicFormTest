import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlOptions, ValidatorFn } from '@angular/forms';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
  perfexia: any;
  formDefinition: any;
}

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css']
})
export class JsonFormComponent implements OnChanges {
  @Input() jsonFormData: any;
  public myForm: FormGroup = this.fb.group({});
  public row!: JsonFormControls;
  campo: any;
  constructor(private fb: FormBuilder) {}
  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['jsonFormData'].firstChange) {
      console.log(this.jsonFormData)
      this.createForm(this.jsonFormData.formDefinition.fields);
    }
  } 


  createForm(controls: JsonFormControls[]) {
    for (const control of controls) {
      for (const [key, value] of Object.entries(control)) {
        if(key == 'fields'){
          for(const row of Object.entries(value)) {
            for(let campo of row[1] as any ) {
              this.myForm.addControl(campo.id,this.fb.control(campo?.value,Validators.required));
            }
          }
        }
      }
    }
  }

  onSubmit() {
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }

  countKey(array: number){return Object.keys(array).length}

  createArray(numeroChiavi: number){return new Array(numeroChiavi).fill(1)}

  controlType(JsonDataSegment: any){return JsonDataSegment && JsonDataSegment.params.field?.type ? JsonDataSegment.params.field.type : JsonDataSegment?.type }

  scope(objectToScope: any){console.log(objectToScope)}



}
