import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registros/service/registro.service';
import { Registro } from '../registros/service/registro';
import { RegistroComponent } from '../registros/registro/registro.component';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../pacientes/service/paciente.service';
import { ActividadService } from '../actividades/service/actividad.service';
import { FormsModule } from '@angular/forms';
import { Actividad } from '../actividades/service/actividad';
import { AlertaService } from '../../shared/alerta-service';

@Component({
    selector: 'app-informes',
    standalone: true,
    templateUrl: './informes.component.html',
    styleUrls: ['./informes.component.css'],
    imports: [RegistroComponent, CommonModule, FormsModule]
})

export class InformesComponent implements OnInit {
    listadoRegistros: Registro[] = [];
    pacientes: any[] = [];
    actividades: Actividad[] = [];
    actividadNombreMap: { [key: number]: string } = {};
  
    pacienteId: string = '';
    actividadId: number | null = null;
  
    constructor(
        private registroService: RegistroService,
        private pacienteService: PacienteService,
        private actividadService: ActividadService,
        private alertaService: AlertaService
    ) {}
  
    ngOnInit() {
        this.cargarPacientes();
        this.cargarActividades();
        this.cargarRegistros();
    }
  
    cargarRegistros() {
        if (!this.pacienteId && !this.actividadId) {
            this.registroService.getAllRegistros().subscribe(
                (registros: Registro[]) => {
                    this.listadoRegistros = registros.filter(registro => registro.estado !== "null");
                },
                error => {
                    console.error('Error al obtener los registros:', error);
                }
            );
        } else if (this.pacienteId && !this.actividadId) {
            this.registroService.getAllRegistrosByPaciente(this.pacienteId).subscribe(
                (registros: Registro[]) => {
                    this.listadoRegistros = registros.filter(registro => registro.estado !== "null");
                },
                error => {
                    console.error('Error al obtener los registros:', error);
                }
            );
        } else if (!this.pacienteId && this.actividadId) {
            this.registroService.getAllRegistrosByActividad(this.actividadId).subscribe(
                (registros: Registro[]) => {
                    this.listadoRegistros = registros.filter(registro => registro.estado !== "null");
                },
                error => {
                    console.error('Error al obtener los registros:', error);
                }
            );
        } else if (this.pacienteId && this.actividadId) {
            this.registroService.getAllRegistrosByPacienteAndActividad(this.pacienteId, this.actividadId).subscribe(
                (registros: Registro[]) => {
                    this.listadoRegistros = registros.filter(registro => registro.estado !== "null");
                },
                error => {
                    console.error('Error al obtener los registros:', error);
                }
            );
        }
    }
  
    cargarPacientes() {
        this.pacienteService.getAllPacientes().subscribe(
            (pacientes: any[]) => {
                this.pacientes = pacientes;
            },
            error => {
                console.error('Error al obtener los pacientes:', error);
            }
        );
    }
  
    cargarActividades() {
      this.actividadService.getAllActividades().subscribe(
          (actividades: Actividad[]) => {
              this.actividades = actividades;
              this.actividadNombreMap = {};
              for (let actividad of actividades) {
                  this.actividadNombreMap[actividad.idActividad] = actividad.nombre;
              }
          },
          error => {
              console.error('Error al obtener las actividades:', error);
          }
      );
  }
  
    esRegistroRealizado(registro: Registro): boolean {
        return registro.estado === 'Realizado' || registro.estado === 'realizado';
    }
  
    getNombreActividad(idActividad: number): string {
        return this.actividadNombreMap[idActividad] || 'Desconocida';
    }
  
    eliminarRegistrosAntiguos() {
        this.alertaService.alertaConfirmacionPromesa(`¿Estás seguro que deseas eliminar registros con mas de 6 meses de antiguedad?`).then((result) => {
          if (result.isConfirmed) {
            this.registroService.deleteRegistrosAntiguos().subscribe(
              () => {
                this.alertaService.alertaSuccess(`Registros eliminados correctamente.`);
              },
              error => {
                this.alertaService.alertaError(`Error al eliminar los registros antiguos.`);
              }
            );
          }
        });
      }
  }
