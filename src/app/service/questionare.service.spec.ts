import { TestBed } from '@angular/core/testing';

import { QuestionareService } from './questionare.service';

describe('QuestionareService', () => {
  let service: QuestionareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
