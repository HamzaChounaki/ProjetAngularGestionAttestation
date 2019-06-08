import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegionService } from './region.service';
import { Region } from '../beans/Region'

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {

  regions : Region[];
  regionForm : FormGroup;
  operation : string = 'add';
  selectedRegion : Region;

  constructor(private regionService : RegionService, private fb : FormBuilder) { 
      this.createForm();
   }

  ngOnInit() {
      this.initRegion();
      this.loadRegions();
  }

  createForm(){
    this.regionForm = this.fb.group({
      nom : ''
    });
  }

  loadRegions(){
    this.regionService.getRegions().subscribe(
      data => {this.regions = data},
      error => {console.log('ERREUR !!!!!!')},
      () => {console.log('Le chargement des regions est terminé.')}
    );
  }

  addRegion(){
    const r = this.regionForm.value;
    this.regionService.addRegion(r).subscribe(
      res => {
        this.initRegion();
        this.loadRegions();
      }
    );
  }

  updateRegion(){
    console.log("Mise a jour " + this.selectedRegion.nom);
    this.regionService.updateRegion(this.selectedRegion).subscribe(
      res => {
        this.initRegion();
        this.loadRegions();
        this.operation="add";
      }
    );
  }

  deleteRegion(){
    this.regionService.deleteRegion(this.selectedRegion.id).subscribe(
      res => {
        this.selectedRegion = new Region();
        this.loadRegions();
      }
    );
  }

  initRegion(){
    this.selectedRegion = new Region();
    this.createForm();
  }
}
