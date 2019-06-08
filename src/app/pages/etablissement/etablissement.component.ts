import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EtablissementService } from './etablissement.service';
import { Ville } from '../beans/Ville';
import { Etablissement } from '../beans/Etablissement';
import { VilleService } from '../ville/ville.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {

  etablissements : Etablissement[];
  villes : Ville[];
  ville : Ville;
  ville2: Ville;
  etablissementForm: FormGroup;
  operation: string = 'add'
  selectedEtablissement: Etablissement;

  constructor(private etablissementService : EtablissementService, private villeService: VilleService, private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
    this.initEtablissement();
    this.loadEtablissements();
    this.loadVilles();
  }

  createForm(){
    this.etablissementForm = this.fb.group({
      nom: '',
      ville: ''
    });
  }

  loadEtablissements(){
    this.etablissementService.getEtablissements().subscribe(
      data => {this.etablissements = data},
      error => {console.log('ERREUR !!!')},
      () => {console.log('Le chargement des etablissements est terminé.')}
    );
  }

  loadVilles(){
    this.villeService.getVilles().subscribe(
      data => {this.villes = data},
      error => {console.log('ERREUR !!!')},
      () => {console.log('Le chargement des villes est terminé.')}
    );
    return this.ville;
  }

  findVilleById(id:any):any{
    console.log('ville  '+this.selectedEtablissement.ville)
     this.villeService.getVilleById(id).subscribe(
      data => {this.ville = data},
      error => {console.log('ERREUR !!!')},
      () => {console.log('Le chargement des villes est terminé')}
    );
    return this.ville;
  }

  addEtablissement(){
    console.log('ville  '+this.selectedEtablissement.ville)
    const v = this.etablissementForm.value;
    console.log('find by ' + this.findVilleById(this.selectedEtablissement.ville));
    if(this.findVilleById(this.selectedEtablissement.ville)!=null){
      v.ville = this.findVilleById(this.selectedEtablissement.ville);
    }    
    this.etablissementService.addEtablissement(v).subscribe(    
      res => {
        this.initEtablissement();
        this.loadEtablissements();
      }
     
    );
  }

  updateEtablissement(){
    if(this.findVilleById(this.selectedEtablissement.ville)!=null){
      this.selectedEtablissement.ville = this.findVilleById(this.selectedEtablissement.ville);
    }  
    this.etablissementService.updateEtablissement(this.selectedEtablissement).subscribe(
      res => {
        this.initEtablissement();
        this.loadEtablissements();
        this.operation="add";
      }
    );
  }

  deleteEtablissement(){
    this.etablissementService.deleteEtablissement(this.selectedEtablissement.id).subscribe(
      res => {
        this.selectedEtablissement = new  Etablissement();
        this.loadEtablissements();
      }
    );
  }

  initEtablissement(){
    this.selectedEtablissement = new  Etablissement();
    this.createForm();
  }
}
