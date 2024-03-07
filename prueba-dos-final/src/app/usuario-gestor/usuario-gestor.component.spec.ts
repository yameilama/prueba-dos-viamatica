import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioGestorComponent } from './usuario-gestor.component';

describe('UsuarioGestorComponent', () => {
  let component: UsuarioGestorComponent;
  let fixture: ComponentFixture<UsuarioGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioGestorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
