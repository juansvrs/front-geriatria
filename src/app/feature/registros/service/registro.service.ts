import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from './registro'; // Asegúrate de importar la interfaz Registro si la tienes definida

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = '/api/registros';

  constructor(private httpClient: HttpClient) { }

  getAllRegistros(): Observable<Registro[]> {
    return this.httpClient.get<Registro[]>(this.apiUrl);
  }

  getRegistroById(id: number): Observable<Registro> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Registro>(url);
  }

  saveRegistro(registro: Registro): Observable<Registro> {
    return this.httpClient.post<Registro>(this.apiUrl, registro);
  }

  updateRegistro(registro: Registro): Observable<Registro> {
    return this.httpClient.put<Registro>(this.apiUrl, registro);
  }

  deleteRegistro(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }

  getAllRegistrosByPaciente(idPaciente: string): Observable<Registro[]> {
    const url = `${this.apiUrl}/paciente/${idPaciente}`;
    return this.httpClient.get<Registro[]>(url);
  }

  getAllRegistrosByActividad(idActividad: number): Observable<Registro[]> {
    const url = `${this.apiUrl}/actividad/${idActividad}`;
    return this.httpClient.get<Registro[]>(url);
  }

  getAllRegistrosByPacienteAndActividad(idPaciente: string, idActividad: number): Observable<Registro[]> {
    const url = `${this.apiUrl}/paciente/${idPaciente}/actividad/${idActividad}`;
    return this.httpClient.get<Registro[]>(url);
  }

  getAllRegistrosByPacienteAndFecha(idPaciente: string, fecha: string): Observable<Registro[]> {
    const url = `${this.apiUrl}/paciente/${idPaciente}/fecha/${fecha}`;
    return this.httpClient.get<Registro[]>(url);
  }

  deleteRegistrosAntiguos(): Observable<void> {
    const url = `${this.apiUrl}/eliminarAntiguos`;
    return this.httpClient.delete<void>(url);
  }
}
