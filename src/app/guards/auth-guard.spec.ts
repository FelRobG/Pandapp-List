import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {

  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('debe crearse correctamente', () => {
    expect(guard).toBeTruthy();
  });

  it('debe redirigir a login si no hay state', () => {
    const result = guard.canActivate();
    expect(result).toBeFalse();
  });

});