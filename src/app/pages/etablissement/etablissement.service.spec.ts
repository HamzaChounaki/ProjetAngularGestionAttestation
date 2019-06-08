import { TestBed } from '@angular/core/testing';
import { EtablissementService } from './etablissement.service';

describe('EtablissementService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const ville: EtablissementService = TestBed.get(EtablissementService);
        expect(ville).toBeTruthy();
    });
});