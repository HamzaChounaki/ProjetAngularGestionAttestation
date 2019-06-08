import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfilService } from './profil.service';
import { Profil } from '../beans/Profil'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profils: Profil[];
  profilForm: FormGroup;
  operation: string = 'add';
  selectedProfil: Profil;

  constructor(private profilService: ProfilService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.initProfil();
    this.loadProfils();
  }

  createForm() {
    this.profilForm = this.fb.group({
      libelle: ''
    });
  }

  loadProfils() {
    this.profilService.getProfils().subscribe(
      data => { this.profils = data },
      error => { console.log('ERREUR !!!!!!') },
      () => { console.log('Le chargement des profils est terminé') }
    );
  }

  addProfil() {
    const p = this.profilForm.value;
    this.profilService.addProfil(p).subscribe(
      res => {
        this.initProfil();
        this.loadProfils();
      }
    );
  }

  updateProfil() {
    console.log("update " + this.selectedProfil.libelle);
    this.profilService.updateProfil(this.selectedProfil).subscribe(
      res => {
        this.initProfil();
        this.loadProfils();
        this.operation = "add";
      }
    );
  }

  deleteProfil() {
    this.profilService.deleteProfil(this.selectedProfil.id).subscribe(
      res => {
        this.selectedProfil = new Profil();
        this.loadProfils();
      }
    );
  }

  initProfil() {
    this.selectedProfil = new Profil();
    this.createForm();
  }
}
