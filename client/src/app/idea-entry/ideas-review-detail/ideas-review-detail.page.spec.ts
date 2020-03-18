import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdeasReviewDetailPage } from './ideas-review-detail.page';

describe('IdeasReviewDetailPage', () => {
  let component: IdeasReviewDetailPage;
  let fixture: ComponentFixture<IdeasReviewDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasReviewDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdeasReviewDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
