import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ProfilService } from '../profil/profil.service';
import { Profil } from '../beans/Profil';
import { NgForOf } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { of } from 'rxjs';
import { element } from '@angular/core/src/render3';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    ngOnInit() {
        this.loadChart();
    }
    canvas: any;
    ctx: any;
    profils: Profil[];
    constructor(private profilService: ProfilService) {
    }
    loadChart() {
        let profil: Array<string> = [];
        let employe: Array<number> = [];
        this.profilService.CountEmpnoParProfil().subscribe(data => {
            data.forEach(element => {
                profil.push(element[0])
                employe.push(element[1])
            });
            this.canvas = document.getElementById('myChart');
            this.ctx = this.canvas.getContext('2d');
            let myChart = new Chart(this.ctx, {
                type: 'bar',
                data: {
                    labels: profil,
                    datasets: [{
                        label: 'employe par profil',
                        data: employe,
                        backgroundColor: 'rgba(0, 119, 204, 0.3)',
                        borderWidth: 1,
                    }]
                },
                options: {
                    responsive: false,
                    scales: {
                        yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }]
                    }
                },

            });
        }, error => { console.log('erreur'); }, () => { console.log('Chargement profil effectuer'); });
    }
}