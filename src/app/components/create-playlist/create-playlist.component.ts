import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../landing-page/navbar/navbar.component';
import { Router } from '@angular/router';
import { FooterComponent } from '../landing-page/footer/footer.component';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FooterComponent],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.scss'
})
export class CreatePlaylistComponent {

  baseUrl: string = environment.baseUrl;

  form = this.formBuilder.group({
    title: ['', Validators.required],
    description: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) { }

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        title: this.form.get('title')?.value,
        // description: this.form.get('description')?.value
      };

      this.http.post<any>(this.baseUrl + 'api/v1/playlists/', formData).subscribe( (response) => {
         if (response.success === true) {
          this.router.navigate(['/playlists'])
         }
        },
        (error) => {
          console.error('Error creating playlist:', error);
        }
      );
    }
  }
};
