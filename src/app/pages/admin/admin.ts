import { Component, inject, OnInit, signal, computed } from '@angular/core'; // <--- Adicionei 'computed'
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  
  listaAgendamentos = signal<any[]>([]);

  // --- CÁLCULOS AUTOMÁTICOS (DASHBOARD) ---
  
  // 1. Conta quantos itens tem na lista
  totalAgendamentos = computed(() => this.listaAgendamentos().length);

  // 2. Pega o primeiro da lista (assumindo que o Python manda ordenado ou a lista é inserida em ordem)
  proximoCliente = computed(() => {
    const lista = this.listaAgendamentos();
    if (lista.length > 0) {
      // Retorna o primeiro da fila
      return lista[0]; 
    }
    return null; // Se não tiver ninguém
  });

  ngOnInit() {
    const logado = localStorage.getItem('admin_logado');
    if (!logado) {
      this.router.navigate(['/login']);
      return;
    }
    this.carregarDados();
  }

  carregarDados() {
    this.apiService.getAgendamentos().subscribe({
      next: (dados) => {
        // Opcional: Se quiser garantir a ordem por data/hora, faríamos um .sort() aqui.
        // Por enquanto, vamos confiar na ordem que vem do banco.
        this.listaAgendamentos.set(dados);
      },
      error: (erro) => console.error('Erro ao buscar dados:', erro)
    });
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.apiService.excluirAgendamento(id).subscribe({
        next: () => this.carregarDados(),
        error: () => alert('Erro ao excluir!')
      });
    }
  }

  sair() {
    localStorage.removeItem('admin_logado');
    this.router.navigate(['/login']);
  }
}