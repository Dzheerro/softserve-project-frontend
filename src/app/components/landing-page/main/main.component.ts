import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { MediaComponent } from '../media/media.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, SliderComponent, FooterComponent, CommonModule, MediaComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {

}