import { TestBed } from '@angular/core/testing';

import { EtudiantService } from './etudiant.service';

describe('EtudiantService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const etablissement: EtudiantService = TestBed.get(EtudiantService);
        expect(etablissement).toBeTruthy();
    })
})