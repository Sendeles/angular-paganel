import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {IPost} from "../../../../environments/environments";
import {PostServices} from "../../services/post.services";

@Component({
  selector: 'app-country-selection',
  standalone: true,
  imports: [
    CommonModule, // для *ngFor
    FormsModule, // для работы модального онка
    MatDialogModule, // для работы модального онка
    MatFormFieldModule, // для работы модального онка
    MatSelectModule // для работы модального онка
  ],
  templateUrl: './country-selection.component.html',
  styleUrl: './country-selection.component.scss'
})
export class CountrySelectionComponent {

  selectedCountry: string = '';

  constructor(
    public postServices: PostServices,
    public dialogRef: MatDialogRef<CountrySelectionComponent>,
    //Ипортируем названия стран которые будут выпадать в модальном окне, @Inject, чтобы внедрить данные, которые передаются в модальное окно при его открытии
    @Inject(MAT_DIALOG_DATA) public data: { travels: { name: string, id: string }[], post: IPost}
  ) {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.postServices.createPostById(this.data.post, this.selectedCountry).subscribe(() => {
    })
    this.dialogRef.close(this.data.post.id);
    console.log('huynya', this.data)
    console.log('this.selectedCountry', this.selectedCountry)
  }
}
