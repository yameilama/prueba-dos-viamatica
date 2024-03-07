import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsHeaderComponent } from './clients-header.component';

describe('ClientsHeaderComponent', () => {
  let component: ClientsHeaderComponent;
  let fixture: ComponentFixture<ClientsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
