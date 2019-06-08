import { TestBed, async } from '@angular/core/testing';
import { InvoiceComponent } from './invoice.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvoiceComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'argon-dashboard-angular'`, () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('argon-dashboard-angular');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(InvoiceComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to argon-dashboard-angular!');
  });
});
