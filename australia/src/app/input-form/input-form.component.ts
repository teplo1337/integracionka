import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { map, filter, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Input ('list') list: string [];
  @Output ('result') result: EventEmitter<number> = new EventEmitter();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }
  onSubmit() {
    if (this.searchForm.valid) {
      const index = this.list.indexOf(this.searchForm.get('text').value);
      if (index !== -1) {
        this.result.emit(index);
      }
    }
    this.searchForm.reset();
  }
  createForm() {
    this.searchForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  isFieldValid (field: string) {
    return !this.searchForm.get(field).valid && this.searchForm.get(field).touched;
  }
}
