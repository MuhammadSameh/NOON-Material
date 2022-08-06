import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBrandsComponent } from './fav-brands.component';

describe('FavBrandsComponent', () => {
  let component: FavBrandsComponent;
  let fixture: ComponentFixture<FavBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
