import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria {

  //Mensagens
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP client
  private http = inject(HttpClient);

  //ACTIVATED ROUTE (capturar variaveis passadas na URL da rota)
    private activatedRoute = inject(ActivatedRoute);

    //Armazenar o id da categoria na URL
    private id : string = '';

    //Função executada ao abrir a página
    ngOnInit() {
      //capturar o id enviado na URL
      this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
      //consultar os dados da categoria na API attravés do ID
      this.http.get('http://localhost:8083/api/v1/categorias/' + this.id)
        .subscribe((data: any) => {

          //Preencher o formulário com os dados obtidos
          this.formulario.patchValue(data);
            
        });
    }

    //Criando o formulário 
  formulario = new FormGroup({
    nome: new FormControl('', Validators.required)
  });

  //Criando uma função para fazer a atualização do formulário
  atualizar() {
    //Enviando uma requisição 
    this.http.put('http://localhost:8083/api/v1/categorias/' + this.id, this.formulario.value)
      .subscribe({//Aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set('Categoria atualizada com sucesso!');
          this.mensagemErro.set(''); //Limpa a mensagem de erro
          
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set(""); //Limpa a mensagem de sucesso
        }
      })
  }

}
