import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-usuario.html',
  styleUrl: './cadastrar-usuario.css',
})
export class CadastrarUsuario {

  //Inicializar um atributo do tipo HTTPCLIENT (injeção de dependência)
  private http = inject(HttpClient);

  //Variáveis para gerar as mensagens do usuário
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //Criando um formulário

  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),
  });

  //função para cadastrar o usuário
  cadastrar() {

    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    //Enviar uma chamada para a API de cadastro de usuário
    this.http.post('http://localhost:8082/api/v1/usuario/criar', this.formulario.value).subscribe({//aguardando o retorn da API
      next: (data : any) => {
        this.mensagemSucesso.set('Parabéns, ' + data.nome + '! Seu cadastro foi realizado com sucesso.');
        this.formulario.reset(); //Limpar o formulário após o cadastro
      },
      error: (e) => {
        
        this.mensagemErro.set(e.error);
        
      }
    });

  }
}
