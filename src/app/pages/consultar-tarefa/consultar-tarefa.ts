import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';

@Component({
  selector: 'app-consultar-tarefa',
  imports: [
    Navbar,
    Sidebar,
    CommonModule
  ],
  templateUrl: './consultar-tarefa.html',
  styleUrl: './consultar-tarefa.css',
})
export class ConsultarTarefa {

  //Atributo para armazenar a listagem de tarefas
  tarefas = signal<any[]>([]);

  //HTTP CLIENT para integração com a API:
  private http = inject(HttpClient);

  //Função executada ao abrir a página
  ngOnInit() {
    //Executar a consulta na API dae tarefas
    this.http.get('http://localhost:8083/api/v1/tarefas')
      .subscribe((data) => {
        this.tarefas.set(data as any[]);
      });
  }
}
