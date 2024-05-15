import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../landing-page/navbar/navbar.component';
import { FooterComponent } from '../../landing-page/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActionsTrackService } from '../../../services/actions/actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-album',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './create-album.component.html',
  styleUrl: './create-album.component.scss'
})
export class CreateAlbumComponent {

  form = this.formBuilder.group({
    name: ['', Validators.required],
    description: ''
  });

  constructor(private actionService$: ActionsTrackService, private formBuilder: FormBuilder, private router: Router) { }

  onSubmit() {
    if (this.form.valid) {
      const formData = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value
      };

      this.actionService$.createAlbum(formData).subscribe((response: any) => {
        if (response.success === true) {
          this.router.navigate(['/artist/albums']);
        }
      },
        (error) => {
          console.error('Error in creating Album', error);
        }
      )
    }
  }
}
