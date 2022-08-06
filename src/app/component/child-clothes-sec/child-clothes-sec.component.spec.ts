import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildClothesSecComponent } from './child-clothes-sec.component';

describe('ChildClothesSecComponent', () => {
  let component: ChildClothesSecComponent;
  let fixture: ComponentFixture<ChildClothesSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildClothesSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildClothesSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
