import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-redirect-on-personal-page',
  standalone: true,
  imports: [],
  templateUrl: './redirect-on-personal-page.component.html',
  styleUrl: './redirect-on-personal-page.component.scss'
})
export class RedirectOnPersonalPageComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    // Получаем ID из маршрута
    const id = this.route.snapshot.paramMap.get('id');
    console.log('RedirectOnPersonalPageComponent loaded with id:', id);


    if (!id) {
      this.router.navigate(['/team']); // Перенаправление по умолчанию
      return;
    }

    // Логика перенаправления в зависимости от ID
    switch (id) {
      case 'andrii-andreiev':
        this.router.navigate(['/team/andrii-andreiev']);
        break;
      case 'olga-andreieva':
        this.router.navigate(['/team/olga-andreieva']);
        break;
      default:
        this.router.navigate(['/team']); // Перенаправление по умолчанию
        break;
    }
  }

}
