import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-widget-dialog',
  templateUrl: './add-widget-dialog.component.html',
  styleUrls: ['./add-widget-dialog.component.scss']
})
export class AddWidgetDialogComponent implements OnInit {

  widgetForm: FormGroup = this.buildForm();

  name!: string;
  color!:string;
  price!:string

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string},
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.dialogRef.close(this.widgetForm.value);
  }

  resetForm() {
    this.widgetForm ;

    setTimeout(() => {
      this.widgetForm = this.buildForm();
    }, 300)

  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

}
