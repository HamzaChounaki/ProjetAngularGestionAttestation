import { TestBed } from '@angular/core/testing';
import { AttestationService } from './attestation.service';

describe('AttestationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be crested', () => {
        const a : AttestationService = TestBed.get(AttestationService);
        expect(a).toBeTruthy();
    });
});