import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaPage } from './mapa.page';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
describe('MapaPage', () => {
  let component: MapaPage;
  let fixture: ComponentFixture<MapaPage>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaPage],
      imports: [
        IonicModule.forRoot(), 
        RouterTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
