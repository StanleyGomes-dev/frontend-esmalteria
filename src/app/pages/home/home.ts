import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para listas
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api'; // Importando nosso carteiro

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink], // Adicionamos CommonModule para poder usar loops
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  // 1. Injetamos o serviço
  private apiService = inject(ApiService);

  // 2. Criamos uma caixa para guardar os serviços (Signals são a nova moda do Angular)
  servicos = signal<any[]>([]);

  ngOnInit() {
    // 3. Assim que a tela nasce, buscamos os dados
    this.carregarServicos();
  }

  carregarServicos() {
    this.apiService.getServicos().subscribe({
      next: (dados) => {
        console.log('Dados recebidos do Python:', dados); // Para debug
        this.servicos.set(dados); // Guarda os dados na caixa
      },
      error: (erro) => {
        console.error('Erro ao buscar serviços:', erro);
      }
    });
  }
}