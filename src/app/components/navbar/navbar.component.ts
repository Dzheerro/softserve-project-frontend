import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDataJwtService } from '../../services/user-data-jwt.service';
import { CommonModule } from '@angular/common';

 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username: string | null;

  constructor (private userDataJwtService: UserDataJwtService) {
    this.username = this.userDataJwtService.getUsername();
  }

}
