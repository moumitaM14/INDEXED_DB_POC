import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgestsComponent } from './widgests.component';

describe('WidgestsComponent', () => {
  let component: WidgestsComponent;
  let fixture: ComponentFixture<WidgestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
