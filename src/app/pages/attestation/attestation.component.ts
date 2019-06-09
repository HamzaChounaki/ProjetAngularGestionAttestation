import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AttestationService } from './attestation.service';
import { Attestation } from '../beans/Attestation';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../beans/Employe';
import { EtudiantService } from '../etudiant/etudiant.service';
import { Etudiant } from '../beans/Etudiant';
import * as jsPDF from 'jspdf';
import { Options } from 'selenium-webdriver/opera';


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

  imprimerAttestation(){
    const doc = new jsPDF();
    doc.text('Office de formation professionnelle',60,10);
    doc.text('et de promotion du travail',73,20);
    doc.text('ATTESTATION DE REUSSITE',65,45);
    doc.text('Promotion 2019',86,55);
    doc.text('Direction regionale Marrakech Safi',62,75);
    doc.text('Nous attestons par la presente que : ',5,105);
    doc.text('Mme/Mr : ................                                        N°CNI : .........',5,115);
    doc.text('a passe avec succes les examens de fin de formation : ',5,132);
    doc.text('Etablissement : ISTA NTIC SYBA MARRAKECH',5,145);
    doc.text('Filiere : TECHNIQUES DE DEVELOPPEMENT INFORMATIQUE',5,157);
    doc.text('Session : 2019',5,169);
    doc.text('cette attestation est delivree a l`interesse(e) pour servir et valoir ce que de droit.',5,185);
    doc.text('Fait a ..........................   le ..../..../......... ',90,210);
    doc.text('LE DIRECTEUR DU COMPLEXE                            LE DIRECTEUR REGIONAL',5,235);
    doc.text('il ne peut etre delivre de duplicata de cette attestation',5,290);



    doc.save('attestation.pdf');
  }
}
