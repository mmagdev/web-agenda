import { CommonModule } from '@angular/common';
import { Component, signal, inject} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    Sidebar
  ],
  templateUrl: './cadastrar-categoria.html',
  styleUrl: './cadastrar-categoria.css',
})
export class CadastrarCategoria {

  //Mensagens da página
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP CLIENT (Integtração com a API)
  private http = inject(HttpClient);

  //Criando o formulário 
  formulario = new FormGroup({
    nome: new FormControl('', Validators.required)
  });

  //Criando uma função para fazer o SUBMIT do formulário
  cadastrar() {
    //Enviando uma requisição 
    this.http.post('http://localhost:8083/api/v1/categorias', this.formulario.value)
      .subscribe({//Aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set('Categoria cadastrada com sucesso!');
          this.mensagemErro.set(''); //Limpa a mensagem de erro
          this.formulario.reset(); //Limpando o formulário
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set(""); //Limpa a mensagem de sucesso
        }
      })
  }
}
