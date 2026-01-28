import { TestBed } from '@angular/core/testing';
// 1. Importar o nome certo: ApiService
import { ApiService } from './api'; 

describe('ApiService', () => {
  let service: ApiService; // 2. Tipar com o nome certo

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ApiService] // 3. Prover o serviço (necessário no Angular novo)
    });
    service = TestBed.inject(ApiService); // 4. Injetar com o nome certo
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});