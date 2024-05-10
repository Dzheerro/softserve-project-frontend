import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistHomePageComponent } from './artist-home-page.component';

describe('ArtistHomePageComponent', () => {
  let component: ArtistHomePageComponent;
  let fixture: ComponentFixture<ArtistHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistHomePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtistHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
