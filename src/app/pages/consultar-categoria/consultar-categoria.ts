import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-categoria.html',
  styleUrl: './consultar-categoria.css',
})
export class ConsultarCategoria {

  //Atributos
  categorias = signal<any[]>([]);

  private http = inject(HttpClient);
  ngOnInit() {

    //Consultar as categorias
    this.http.get('http://localhost:8083/api/v1/categorias')
      .subscribe({
        next: (data) => {//resposta de sucesso
          
          //Guardar os dados obtidos para exibir na página
          this.categorias.set(data as any[]);
        },
        error: (e) => {//resposta de erro
          console.log(e.error);

        }
      });

    }

      //Função executada quando o usuário clicar no botão de excluir
      onDelete(categoria: any) {

        //Exibir uma janela opo-up de confirmação
        if(confirm('Tem certeza que deseja excluir a categoria ' + categoria.nome + '?')) {

          //Enviar a requisição para a API
          this.http.delete('http://localhost:8083/api/v1/categorias/' + categoria.id)
            .subscribe({
              next: (data: any) => { //sucesso
                alert('Categoria: ' + data.nome + ' excluída com sucesso!');
                this.ngOnInit(); //recarregar a lista de categorias para refletir a exclusão
              },
              error: (e) => { //erro
                alert(e.error);
                
              }
            });
            }

      }

  }

