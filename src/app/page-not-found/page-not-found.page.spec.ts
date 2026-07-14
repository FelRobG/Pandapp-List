import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageNotFoundPage } from './page-not-found.page';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('PageNotFoundPage', () => {
  let component: PageNotFoundPage;
  let fixture: ComponentFixture<PageNotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundPage],
      imports: [
        IonicModule.forRoot(), 
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});