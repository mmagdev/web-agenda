import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-tarefa',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-tarefa.html',
  styleUrl: './cadastrar-tarefa.css',
})
export class CadastrarTarefa {

  //Atributos para exibir as mensagens
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //Atributo para armazenar a listagem das categorias
   categorias = signal<any[]>([]);

  //HTTP CLIENT para integração com a API:
  private http = inject(HttpClient);

  //Criando o formulário
  formulario = new FormGroup({

    nome : new FormControl('', [Validators.required]),
    data : new FormControl('', [Validators.required]),
    hora : new FormControl('', [Validators.required]),
    prioridade : new FormControl('', [Validators.required]),
    categoriaId : new FormControl('', [Validators.required]),

  });

  //Função executada ao abrir a página
   ngOnInit() {
      //Executar a consulta de categorias
      this.http.get('http://localhost:8083/api/v1/categorias')
        .subscribe((data) => { //capturando o retorno da API
          //armazenar as categorias obtidas
          this.categorias.set(data as any[]);
        });
   }

  //Função para cadastrar a tarefa
  cadastrar() {
    //Enviando uma requisição 
    this.http.post('http://localhost:8083/api/v1/tarefas', this.formulario.value)
      .subscribe({//Aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set('Tarefa ' + data.nome + ' cadastrada com sucesso!');
          this.mensagemErro.set(''); //Limpa a mensagem de erro
          this.formulario.reset(); //Limpando o formulário
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
          this.mensagemSucesso.set(""); //Limpa a mensagem de sucesso
        }
      })
  }
  
}
