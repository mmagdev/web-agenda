import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Chart, ChartModule } from 'angular-highcharts';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Navbar,
    Sidebar,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  graficoDonut = signal<Chart>(new Chart());
  graficoColunas = signal<Chart>(new Chart());

  formulario = new FormGroup({

    dataMin : new FormControl('', [Validators.required]),
    dataMax : new FormControl('', [Validators.required]),

  });

  consultar() {
    
  };
}
