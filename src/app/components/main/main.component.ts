import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, SliderComponent, FooterComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent {

}