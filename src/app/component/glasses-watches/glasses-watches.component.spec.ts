import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlassesWatchesComponent } from './glasses-watches.component';

describe('GlassesWatchesComponent', () => {
  let component: GlassesWatchesComponent;
  let fixture: ComponentFixture<GlassesWatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlassesWatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlassesWatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
