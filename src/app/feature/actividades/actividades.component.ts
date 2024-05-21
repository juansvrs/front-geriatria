import { Component, OnInit } from '@angular/core';
import { Actividad } from './service/actividad';
import { ActividadService } from './service/actividad.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActividadesAgregarComponent } from "./actividades-agregar/actividades-agregar.component";
import { ActividadesAgregarCategoriaComponent } from "./actividades-agregar-categoria/actividades-agregar-categoria.component";
import { AlertaService } from '../../shared/alerta-service';

@Component({
    selector: 'app-actividades',
    standalone: true,
    templateUrl: './actividades.component.html',
    styleUrl: './actividades.component.scss',
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, ActividadesAgregarComponent, ActividadesAgregarCategoriaComponent]
})
export class ActividadesComponent implements OnInit {

  actividades: Actividad[] = [];
  actividadForm: FormGroup;
  actividadSeleccionada: Actividad | null = null;

  constructor(private actividadService: ActividadService, private alertaService: AlertaService) {

    this.actividadForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.actividadService.getAllActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  abrirModalEditar(actividad: Actividad) {
    this.actividadSeleccionada = actividad;
    this.actividadForm.setValue({
      nombre: actividad.nombre,
      descripcion: actividad.descripcion,
      hora: actividad.hora || '',
      url: actividad.url
    });
  }

  guardarCambios() {
    if (this.actividadForm.valid && this.actividadSeleccionada) {
      const actividadData = {
        nombre: this.actividadForm.value.nombre,
        descripcion: this.actividadForm.value.descripcion,
        hora: this.actividadForm.value.hora || null,
        url: this.actividadForm.value.url
      };

      Object.assign(this.actividadSeleccionada, actividadData);

      console.log('Cambios guardados:', this.actividadSeleccionada);
    } else {
      console.log('Formulario no válido');
    }
  }

  eliminarActividad(id: number, nombre: string) {
    this.alertaService.alertaConfirmacionPromesa(`¿Estás seguro que deseas eliminar la actividad ${nombre}?`).then((result) => {
      if (result.isConfirmed) {
        this.actividadService.deleteActividad(id).subscribe(
          () => {
            this.alertaService.alertaSuccess(`Actividad ${nombre} eliminada correctamente.`);
            this.actividades = this.actividades.filter(a => a.idActividad !== id);
          },
          error => {
            this.alertaService.alertaError(`Error al eliminar la actividad ${nombre}. Es posible que la actividad tenga pacientes asociados`);
          }
        );
      }
    });
  }

  
}