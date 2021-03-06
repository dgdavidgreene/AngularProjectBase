import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { convertToParamMap, ParamMap, Params } from '@angular/router';

import { ReplaySubject } from 'rxjs';

import { Store, StoreModule } from '@ngrx/store';

import { LoginPageComponent } from './login-page.component';
import { AuthenticationService } from '@app/core/auth';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}

describe('LoginPageComponent', () => {
  const formBuilder: FormBuilder = new FormBuilder();

  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let route: ActivatedRouteStub;
  let router: Router;
  let store: Store<any>;
  let authenticationService: AuthenticationService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot({}) 
      ],
      declarations: [ 
        LoginPageComponent 
      ],
     providers: [ { provide: FormBuilder, useValue: formBuilder } ] 
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
/*
    authenticationService =        
      fixture.debugElement.injector.get(AuthenticationService);

        spy = spyOn(authenticationService, 'login')
            .and.returnValue(Observable.of<User>());
*/

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
