import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditUsuariosComponent } from './modal-edit-usuarios.component';

describe('ModalEditUsuariosComponent', () => {
  let component: ModalEditUsuariosComponent;
  let fixture: ComponentFixture<ModalEditUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
