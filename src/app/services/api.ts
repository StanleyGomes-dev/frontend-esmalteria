import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-esmalteria.onrender.com/api';

  constructor() { }

  // 1. Busca Serviços
  getServicos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicos`);
  }

  // 2. Busca Horários
  getHorarios(data: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/horarios?data=${data}`);
  }

  // 3. Salva Agendamento
  salvarAgendamento(agendamento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agendar`, agendamento);
  }

  // 4. Busca Lista de Agendamentos (O NOVO!)
  getAgendamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/agendamentos`);
  }
  // 5. Deletar Agendamento (NOVO)
  excluirAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/agendamentos/${id}`);
  }
}
