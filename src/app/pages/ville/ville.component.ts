import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VilleService } from './ville.service';
import { Region } from '../beans/Region'
import { Ville } from '../beans/Ville';
import { RegionService } from '../region/region.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.scss']
})
export class VilleComponent implements OnInit {

  villes : Ville[];
  regions : Region[];
  region : Region;
  region2 : Region;
  villeForm : FormGroup;
  operation : string = 'add';
  selectedVille : Ville;

  constructor(private villeService : VilleService, private regionService : RegionService, private fb : FormBuilder) {
      this.createForm();
   }

  ngOnInit() {
    this.initVille();
    this.loadVilles();
    this.loadRegions();
  }

  createForm(){
    this.villeForm = this.fb.group({
      codePostale: '',
      nom: '',
      region: ''
    });
  }

  loadVilles(){
    this.villeService.getVilles().subscribe(
      data => {this.villes = data},
      error => {console.log('ERRUER !!!!')},
      () => {console.log('Le chargement des villes est terminé ' )}
      
    );
   
  }

  loadRegions(){
    this.regionService.getRegions().subscribe(
      data => {this.regions = data},
      error => {console.log('ERREUR  !!!')},
      () => {console.log('Le chargement des regions est terminé')}
    );
  }

  findRegionById(id:any):any{
    console.log('region '+this.selectedVille.region)
     this.regionService.getRegionById(id).subscribe(
      data => {this.region = data},
      error => {console.log('ERREUR !!!')},
      () => {console.log('Le chargement des regions est terminé')}
    );
    return this.region;
  }

  addVille(){
    console.log('region  '+this.selectedVille.region)
    const v = this.villeForm.value;
    console.log('find by ' + this.findRegionById(this.selectedVille.region));
    if(this.findRegionById(this.selectedVille.region)!=null){
      v.region = this.findRegionById(this.selectedVille.region);
    }    
    this.villeService.addVille(v).subscribe(    
      res => {
        this.initVille();
        this.loadVilles();
      }
     
    );
  }

  updateVille(){
    if(this.findRegionById(this.selectedVille.region)!=null){
      this.selectedVille.region = this.findRegionById(this.selectedVille.region);
    }  
    this.villeService.updateVille(this.selectedVille).subscribe(
      res => {
        this.initVille();
        this.loadVilles();
        this.operation="add";
      }
    );
  }

  deleteVille(){
    this.villeService.deleteVille(this.selectedVille.id).subscribe(
      res => {
        this.selectedVille = new  Ville();
        this.loadVilles();
      }
    );
  }

  initVille(){
    this.selectedVille = new Ville();
    this.createForm();
  }
}
