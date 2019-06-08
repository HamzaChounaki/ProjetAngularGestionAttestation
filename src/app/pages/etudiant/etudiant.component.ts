import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EtudiantService } from './etudiant.service';
import { Etudiant } from '../beans/Etudiant';
import { Etablissement } from '../beans/Etablissement';
import { EtablissementService } from '../etablissement/etablissement.service';

@Component({
    selector: 'app-etudiant',
    templateUrl: './etudiant.component.html',
    styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {

    etudiants : Etudiant[];
    etablissements : Etablissement[];
    etablissement : Etablissement;
    etablissement2 : Etablissement;
    etudiantForm : FormGroup;
    operation : string = 'add';
    selectedEtudiant: Etudiant;

    constructor(private etudiantService : EtudiantService,private etablissementService: EtablissementService, private fb:FormBuilder){
        this.createForm ();
    }

    ngOnInit() {
        this.initEtudiant();
        this.loadEtudiants();
        this.loadEtablissements();
    }

    createForm(){
        this.etudiantForm = this.fb.group({
            nom:'',
            prenom:'',
            dateNaissance:'',
            lieuNaissance:'',
            codeNationale:'',
            niveau:'',
            etablissement:''
        });
    }

    loadEtudiants(){
        this.etudiantService.getEtudiants().subscribe(
            data => {this.etudiants = data},
            error => {console.log('ERREUR !!!')},
            () => {console.log('Le chargement des etudiants est terminé')}
        );
    }

    loadEtablissements(){
        this.etablissementService.getEtablissements().subscribe(
            data => {this.etablissements = data},
            error => {console.log('ERRUER !!!')},
            () => {console.log('Le chargement des etablissements est terminé')}
        );
    }

    findEtablissementById(id:any):any{
        console.log('etablissement '+this.selectedEtudiant.etablissement)
        this.etablissementService.getEtablissementById(id).subscribe(
            data => {this.etablissement = data},
            error => {console.log('ERREUR !!!')},
            () => {console.log('Le chargement des etablissements est terminé')}
        );
        return this.etablissement;
    }

    addEtudiant(){
        console.log('etablissement '+this.selectedEtudiant.etablissement)
        const e = this.etudiantForm.value;
        console.log('find by '+this.findEtablissementById(this.selectedEtudiant.etablissement));
        if(this.findEtablissementById(this.selectedEtudiant.etablissement) != null){
            e.etablissement = this.findEtablissementById(this.selectedEtudiant.etablissement);
        }
        this.etudiantService.addEtudiant(e).subscribe(
            res => {
                this.initEtudiant();
                this.loadEtudiants();
            }
        );
    }

    updateEtudiant(){
        if(this.findEtablissementById(this.selectedEtudiant.etablissement) != null){
            this.selectedEtudiant.etablissement = this.findEtablissementById(this.selectedEtudiant.etablissement);
        }
        this.etudiantService.updateEtudiant(this.selectedEtudiant).subscribe(
            res => {
                this.initEtudiant();
                this.loadEtudiants();
                this.operation = "add";
            }
        );
    }

    deleteEtudiant(){
        this.etudiantService.deleteEtudiant(this.selectedEtudiant.id).subscribe(
            res => {
                this.selectedEtudiant = new Etudiant();
                this.loadEtudiants();
            }
        );
    }

    initEtudiant(){
        this.selectedEtudiant = new Etudiant();
        this.createForm();
    }
}