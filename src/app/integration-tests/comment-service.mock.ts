import { Comment } from '../models/comment.model'
import { of, throwError } from 'rxjs'
import { Trip } from '../models/trip.model'

export class CommentServiceMock {
    comments: Comment[] = []

    private validateComment(comment: Comment) {
        console.log("VALIDATING ", comment)
        return comment.rating > 0 && comment.user_id != null
    }

    private findObjById(_id: string) {
        return this.comments.find(comment => comment._id == _id)
    }

    private findExistingComment(comment: Comment) {
        return this.comments.find(exc => comment.user_id == exc.user_id && comment.trip_id == exc.trip_id)
    }

    private updateComment(comment: Comment, commentToUpdate: Comment) {
        let index = this.comments.indexOf(commentToUpdate)
        if (index > -1) {
            this.comments[index] = comment
            return of(comment)
        }
        else {
            return throwError("Error while updating a comment");
        }
    }

    getComments() {
        return of(this.comments)
    }

    getComment(_id: string) {
        return of(this.findObjById(_id))
    }

    addComment(comment: Comment, trip: Trip) {
        if (this.validateComment(comment)) {
            comment.trip_id = trip._id
            let commentToUpdate = this.findExistingComment(comment)
            if(commentToUpdate)
                return this.updateComment(comment, commentToUpdate)
            else {
                this.comments.push(comment)
                return of(comment)
            }
        }
        else return throwError("Wrong comment data")
    }

    getTripCommentByUser(user_id: string, trip_id: string) {
        return of(this.comments.find(comment => comment.trip_id == trip_id && comment.user_id == user_id))
    }

    getUserComments(user_id: string) {
        return of(this.comments.filter(comment => comment.user_id == user_id))
    }

    getCommentsByTrip(trip_id: string) {
        return of(this.comments.filter(comment => comment.trip_id == trip_id))
    }

    deleteComment(comment: Comment) {
        let obj = this.findObjById(comment._id)
        let index = this.comments.indexOf(obj)
        console.log(`INDEX OF ${comment._id} IS ${index}`)
        if (index > -1) {
            this.comments.splice(index, 1)
            return of("200 OK")
        }
        else {
            return throwError("This comment doesn't exist");
        }
    }
}