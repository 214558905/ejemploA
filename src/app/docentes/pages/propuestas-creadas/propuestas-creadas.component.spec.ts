import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasCreadasComponent } from './propuestas-creadas.component';

describe('PropuestasCreadasComponent', () => {
  let component: PropuestasCreadasComponent;
  let fixture: ComponentFixture<PropuestasCreadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropuestasCreadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestasCreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
