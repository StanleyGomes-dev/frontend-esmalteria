import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Importante para inputs
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private http = inject(HttpClient);
  private router = inject(Router);

  credenciais = { usuario: '', senha: '' };
  mensagemErro = '';

  entrar() {
    this.http.post('https://api-esmalteria.onrender.com/api/login', this.credenciais).subscribe({
      next: (resposta) => {
        // Deu certo! Guardamos o "crachá" no navegador
        localStorage.setItem('admin_logado', 'sim');
        this.router.navigate(['/admin']); // Manda pro painel
      },
      error: () => {
        this.mensagemErro = 'Usuário ou senha incorretos!';
      }
    });
  }
}