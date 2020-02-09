import { TripDetailsComponent } from "../trip-details/trip-details.component";

import { ComponentFixture, TestBed, async } from "@angular/core/testing";

import { TimeAgoPipe } from "time-ago-pipe";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { RatingModule } from "ng-starrating";

import { RouterTestingModule } from "@angular/router/testing";

import { HttpClientModule } from "@angular/common/http";

import { SpinnerTestModule } from "../spinner/spinner.test.module";

import { MatDialogModule, MatDialog } from "@angular/material";

import { AngularFireModule } from "@angular/fire";

import { environment } from "src/environments/environment";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { Trip } from '../models/trip.model';
import { TripServiceMock } from './trip-service.mock';
import { TripService } from '../services/trip.service';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { SpinnerMock } from './spinner.mock';
import { CommentService } from '../services/comment.service';
import { of } from 'rxjs';
import { AddTripDialogMock } from './admin-trip.integration.spec';
import { Comment } from '../models/comment.model';
import { CommentServiceMock } from './comment-service.mock';
import { AppUser, SecurityRole } from '../models/user.model';
import { correctTrip, correctComment, testUser, incorrectComment } from './test-data';

export class AddCommentDialogMock {
    commentFromForm: Comment

    open() {
        return {
            afterClosed: () => of(this.commentFromForm)
        };
    }
};


describe('TripDetailsIntegration', () => {
    let component: TripDetailsComponent;
    let fixture: ComponentFixture<TripDetailsComponent>;
    let tripService: TripServiceMock
    let commentService: CommentServiceMock
    let dialog: AddCommentDialogMock
    let spyGetTrip: jasmine.Spy
    let spyAddComment: jasmine.Spy

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TripDetailsComponent, TimeAgoPipe],
            imports: [
                NgbModule,
                RatingModule,
                RouterTestingModule,
                HttpClientModule,
                SpinnerTestModule,
                MatDialogModule,
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireAuthModule,
            ],
            providers: [
                {
                    provide: SpinnerOverlayService, useClass: SpinnerMock
                },
                {
                    provide: TripService, useClass: TripServiceMock
                },
                {
                    provide: MatDialog, useClass: AddCommentDialogMock,
                },
                {
                    provide: CommentService, useClass: CommentServiceMock
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TripDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        tripService = TestBed.get(TripService)
        commentService = TestBed.get(CommentService)
        spyGetTrip = spyOn(tripService, 'getProduct').and.callThrough()
        dialog = TestBed.get(MatDialog)
        spyAddComment = spyOn(commentService, 'addComment').and.callThrough()
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(tripService).toBeTruthy();
    });

    it('should display the trip details correctly if it exists', () => {
        tripService.trips = [correctTrip] // put a trip in the database

        component.getTripData(correctTrip._id) // ask for the trip in the db

        expect(spyGetTrip).toHaveBeenCalled() // check if service was called
        expect(component.trip).toEqual(correctTrip) // check if trip data is correct
    });

    it("should fail when trip doesn't exist", () => {
        component.getTripData(correctTrip._id) // ask for trip not existing in the database

        expect(spyGetTrip).toHaveBeenCalled() // check if service was called
        expect(component.trip).not.toEqual(correctTrip) // ensure the data isn't correct, doesn't matter what it is
    });

    it("should add a comment", () => {
        component.trip = correctTrip

        dialog.commentFromForm = correctComment

        component.comment() // add a comment

        expect(spyAddComment).toHaveBeenCalled() // ensure the comment service was called
        expect(component.comments).toEqual([correctComment]) // ensure comment was added correctly
    })

    it("it should change the comment if the trip was already rated", () => {
        commentService.comments = [correctComment] // put the comment in the database
        component.comments = [correctComment]

        component.user = testUser // set logged in user data
        component.trip = correctTrip // set current trip

        let changedComment = {
            ...correctComment,
            text: "UpdatedCommentText",
            rating: 4
        }

        console.log(changedComment)
        dialog.commentFromForm = changedComment

        component.comment() // change a comment
        expect(spyAddComment).toHaveBeenCalled() // ensure the comment service was called
        expect(component.comments).toEqual([changedComment]) // ensure comment was changed correctly
    })


    it("should fail when comment data isn't correct", () => {
        component.trip = correctTrip
        dialog.commentFromForm = incorrectComment

        component.comment() // add a comment

        expect(spyAddComment).toHaveBeenCalled() // ensure the comment service was called
        expect(component.comments).toEqual([]) // ensure comment wasn't added
    })


});
