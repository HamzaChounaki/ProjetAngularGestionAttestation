import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AttestationService } from './attestation.service';
import { Attestation } from '../beans/Attestation';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../beans/Employe';
import { EtudiantService } from '../etudiant/etudiant.service';
import { Etudiant } from '../beans/Etudiant';


@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss']
})
export class AttestationComponent implements OnInit {

  attestations: Attestation[];
  employes: Employe[];
  employe: Employe;
  employe2: Employe;
  etudiants: Etudiant[];
  etudiant: Etudiant;
  etudiant2: Etudiant;
  attestationForm: FormGroup;
  operation: string = 'add';
  selectedAttestation: Attestation;

  constructor(private attestationService: AttestationService, private employeService: EmployeService, private etudiantService: EtudiantService, private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.initAttestation();
    this.loadAttestations();
    this.loadEmployes();
    this.loadEtudiants();
  }

  createForm() {
    this.attestationForm = this.fb.group({
      dateSortie: '',
      numero: '',
      employe: '',
      etudiant: ''
    });
  }

  loadAttestations() {
    this.attestationService.getAttestations().subscribe(
      data => { this.attestations = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des attestations est terminé ') }
    );
  }

  loadEmployes() {
    this.employeService.getEmployes().subscribe(
      data => { this.employes = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des employes est terminé ') }

    );
  }

  loadEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
      data => { this.etudiants = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des etudiants est terminé ') }

    );
  }

  findEmployeById(id: any): any {
    console.log('employe ' + this.selectedAttestation.employe)
    this.employeService.getEmployeById(id).subscribe(
      data => { this.employe = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des employes est terminé') }
    );
    return this.employe;
  }

  findEtudiantById(id: any): any {
    console.log('etudiant ' + this.selectedAttestation.etudiant)
    this.etudiantService.getEtudiantById(id).subscribe(
      data => { this.etudiant = data },
      error => { console.log('ERREUR !!!') },
      () => { console.log('Le chargement des etudiants est terminé') }
    );
    return this.etudiant;
  }

  addAttestation() {
    console.log('employe ' + this.selectedAttestation.employe)
    console.log('etudiant ' + this.selectedAttestation.etudiant)
    const s = this.attestationForm.value;
    console.log('find by ' + this.findEmployeById(this.selectedAttestation.employe));
    console.log('find by ' + this.findEtudiantById(this.selectedAttestation.etudiant));
    if (this.findEmployeById(this.selectedAttestation.employe) != null) {
      s.employe = this.findEmployeById(this.selectedAttestation.employe);
    }
    if (this.findEtudiantById(this.selectedAttestation.etudiant) != null) {
      s.etudiant = this.findEtudiantById(this.selectedAttestation.etudiant);
    }
    this.attestationService.addAttestation(s).subscribe(
      res => {
        this.initAttestation();
        this.loadAttestations();
      }

    );
  }

  updateAttestation() {
    if (this.findEmployeById(this.selectedAttestation.employe) != null) {
      this.selectedAttestation.employe = this.findEmployeById(this.selectedAttestation.employe);
    }
    if (this.findEtudiantById(this.selectedAttestation.etudiant) != null) {
      this.selectedAttestation.etudiant = this.findEtudiantById(this.selectedAttestation.etudiant);
    }
    this.attestationService.updateAttestation(this.selectedAttestation).subscribe(
      res => {
        this.initAttestation();
        this.loadAttestations();
        this.operation = "add";
      }
    );
  }

  deleteAttestation() {
    this.attestationService.deleteAttestation(this.selectedAttestation.id).subscribe(
      res => {
        this.selectedAttestation = new Employe();
        this.loadAttestations();
      }
    );
  }

  initAttestation() {
    this.selectedAttestation = new Attestation();
    this.createForm();
  }
}
