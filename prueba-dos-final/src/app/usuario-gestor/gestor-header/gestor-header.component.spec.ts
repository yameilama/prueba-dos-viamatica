import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorHeaderComponent } from './gestor-header.component';

describe('GestorHeaderComponent', () => {
  let component: GestorHeaderComponent;
  let fixture: ComponentFixture<GestorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestorHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
