import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeService } from './employe.service';
import { Employe } from '../beans/Employe';
import { ProfilService } from '../profil/profil.service';
import { Profil } from '../beans/Profil';
import { EtablissementService } from '../etablissement/etablissement.service';
import { Etablissement } from '../beans/Etablissement';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {

  employes: Employe[];
  profils: Profil[];
  profil: Profil;
  profil2: Profil;
  etablissements: Etablissement[];
  etablissement: Etablissement;
  etablissement2: Etablissement;
  employeForm: FormGroup;
  operation: string = 'add';
  selectedEmploye: Employe;

  constructor(private employeService: EmployeService, private profilService: ProfilService, private etablissementService: EtablissementService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.initEmploye();
    this.loadEmployes();
    this.loadProfils();
    this.loadEtablissements();
  }

  createForm() {
    this.employeForm = this.fb.group({
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      dateEmbauche: '',
      login: '',
      password: '',
      profil: '',
      etablissement: '',
    });
  }

  loadEmployes() {
    this.employeService.getEmployes().subscribe(
      data => { this.employes = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des employes est terminé ') }

    );

  }

  loadProfils() {
    this.profilService.getProfils().subscribe(
      data => { this.profils = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des profils est terminé ') }

    );

  }

  loadEtablissements() {
    this.etablissementService.getEtablissements().subscribe(
      data => { this.etablissements = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des etablissements est terminé') }
    );
  }

  findProfilById(id: any): any {
    console.log('profil ' + this.selectedEmploye.profil)
    this.profilService.getProfilById(id).subscribe(
      data => { this.profil = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des profils est terminé') }
    );
    return this.profil;
  }

  findEtablissementById(id: any): any {
    console.log('etablissement ' + this.selectedEmploye.etablissement)
    this.etablissementService.getEtablissementById(id).subscribe(
      data => { this.etablissement = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des etablissements est terminé') }
    );
    return this.etablissement;
  }

  addEmploye() {
    console.log('profil ' + this.selectedEmploye.profil)
    console.log('etablissement ' + this.selectedEmploye.etablissement)
    const s = this.employeForm.value;
    console.log('find by ' + this.findProfilById(this.selectedEmploye.profil));
    console.log('find by ' + this.findEtablissementById(this.selectedEmploye.etablissement));
    if (this.findProfilById(this.selectedEmploye.profil) != null) {
      s.profil = this.findProfilById(this.selectedEmploye.profil);
    }
    if (this.findEtablissementById(this.selectedEmploye.etablissement) != null) {
      s.etablissement = this.findEtablissementById(this.selectedEmploye.etablissement);
    }
    this.employeService.addEmploye(s).subscribe(
      res => {
        this.initEmploye();
        this.loadEmployes();
      }

    );
  }

  updateEmploye() {
    if (this.findProfilById(this.selectedEmploye.profil) != null) {
      this.selectedEmploye.profil = this.findProfilById(this.selectedEmploye.profil);
    }
    if (this.findEtablissementById(this.selectedEmploye.etablissement) != null) {
      this.selectedEmploye.etablissement = this.findEtablissementById(this.selectedEmploye.etablissement);
    }
    this.employeService.updateEmploye(this.selectedEmploye).subscribe(
      res => {
        this.initEmploye();
        this.loadEmployes();
        this.operation = "add";
      }
    );
  }

  deleteEmploye() {
    this.employeService.deleteEmploye(this.selectedEmploye.id).subscribe(
      res => {
        this.selectedEmploye = new Employe();
        this.loadEmployes();
      }
    );
  }

  initEmploye() {
    this.selectedEmploye = new Employe();
    this.createForm();
  }

}
