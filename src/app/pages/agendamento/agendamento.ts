import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para usar inputs
import { ApiService } from '../../services/api';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  imports: [CommonModule, FormsModule, RouterLink], // Importamos o FormsModule aqui
  templateUrl: './agendamento.html',
  styleUrl: './agendamento.scss'
})
export class Agendamento implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);

  // Variáveis para guardar os dados da tela
  servicos = signal<any[]>([]);
  horariosDisponiveis = signal<string[]>([]);
  
  // O formulário do cliente
  mostrarModal = false; // Começa escondido
  agendamentoFinal: any = {};
  selecionado = {
    servico: '',
    data: '',
    horario: '',
    cliente: 'Cliente Teste', // Depois a gente cria um campo pra digitar o nome
    whatsapp: ''
  };

  mensagem = '';

  ngOnInit() {
    this.carregarServicos();
  }

  carregarServicos() {
    this.apiService.getServicos().subscribe((dados) => {
      this.servicos.set(dados);
    });
  }

  // Essa função roda toda vez que o usuário muda a data
  buscarHorarios() {
    if (!this.selecionado.data) return;

    this.mensagem = 'Buscando horários...';
    this.horariosDisponiveis.set([]); // Limpa a lista antiga

    this.apiService.getHorarios(this.selecionado.data).subscribe({
      next: (dados: any) => {
        this.horariosDisponiveis.set(dados.horarios_livres);
        this.mensagem = dados.mensagem;
      },
      error: () => this.mensagem = 'Erro ao buscar horários.'
    });
  }

  confirmar() {

    // 1. Validação (Impede enviar vazio)
    if (!this.selecionado.cliente || !this.selecionado.whatsapp || !this.selecionado.data || !this.selecionado.horario) {
      alert('Preencha todos os campos!');
      return;

    }

    // 2. CRIA O PACOTE (Isso tem que vir ANTES de enviar)
    const pacote = {
      cliente: this.selecionado.cliente,
      whatsapp: this.selecionado.whatsapp,
      servico_id: this.selecionado.servico,
      data: this.selecionado.data,
      horario: this.selecionado.horario
    };

    // 3. Agora sim, envia o pacote criado
    this.apiService.salvarAgendamento(pacote).subscribe({
      next: () => {
        // Sucesso: Mostra o Toast e espera
        this.agendamentoFinal = pacote;
        this.mostrarModal = true;
        
      },
      error: (erro) => {
        alert('Erro ao agendar! Veja o console.');
        console.error(erro);
      }
    });
  }
  fecharModal() {
    this.mostrarModal = false;
    this.router.navigate(['/']); // Manda o cliente para a Home
  }
  }