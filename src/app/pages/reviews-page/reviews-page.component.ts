import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {StarsRatingComponent} from "../../shared/components/stars-rating/stars-rating.component";
import {LanguageServices} from "../../shared/services/language.services";
import {RouterModule} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PostServices} from "../../shared/services/post.services";
import {IPost} from "../../../environments/environments";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, StarsRatingComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './reviews-page.component.html',
  styleUrl: './reviews-page.component.scss'
})
export class ReviewsPageComponent {

  travels = [
    { name: 'Antarctica', id: 'antarctica', image: './assets/images/travels/antarctica.webp', reviewsLink: '#' },
    { name: 'Zimbabwe', id: 'zimbabwe', image: './assets/images/travels/zimbabwe.webp', reviewsLink: '#' },
    { name: 'Socotra', id: 'socotra', image: './assets/images/travels/socotra.webp', reviewsLink: '#' },
    { name: 'Mexico', id: 'mexico', image: './assets/images/travels/mexico.webp', reviewsLink: '#' },
    { name: 'Tierra Del Fuega', id: 'tierra-del-fuega', image: './assets/images/travels/tierraDelFuega.webp', reviewsLink: '#' },
    { name: 'Indonesia', id: 'indonesia', image: './assets/images/travels/indonesia.webp', reviewsLink: '#' },
    { name: 'Bolivia', id: 'bolivia', image: './assets/images/travels/bolivia.webp', reviewsLink: '#' },
    { name: 'Australia', id: 'australia', image: './assets/images/travels/australia.webp', reviewsLink: '#' }
]


  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    expedition: new FormControl('', Validators.required),
    social: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
    date: new FormControl(new Date())
  });


  constructor(
    public languageService: LanguageServices,
    private postService: PostServices
  ) {
  }

  onSubmit() {
    if (this.form.invalid) {
    }
    console.log('Значения формы:', this.form.value);
    //задаем объект для отправки на бекенд в данной формулировке
    const post: IPost = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      expedition: this.form.value.expedition,
      social: this.form.value.social,
      review: this.form.value.review,
      date: new Date()
    }

    this.postService.createPost(post).subscribe(() => {
      this.form.reset()
      // this.alertServ.success('Пост был создан')
    })
    console.log('click')
  }

}
