import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAgregarComponent } from './paciente-agregar.component';

describe('PacienteAgregarComponent', () => {
  let component: PacienteAgregarComponent;
  let fixture: ComponentFixture<PacienteAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteAgregarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
