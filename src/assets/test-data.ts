import { Trip } from 'src/app/models/trip.model'
import { Comment } from 'src/app/models/comment.model'
import { AppUser, SecurityRole } from 'src/app/models/user.model'

import { Order } from 'src/app/models/order.model'

export let correctTrip: Trip = { _id: "1", name: 'Trip 1', country: 'Turcja', rating: 0, startDate: Date(), endDate: Date(), price: 210, maxSeats: 18, seatsLeft: 18, description: "Lorem ipsum", photos: [] }
export let incorrectTrip: Trip = { _id: "0", name: 'Trip 1', country: 'Turcja', rating: -5, startDate: Date(), endDate: Date(), price: -5, maxSeats: 18, seatsLeft: 18, description: "Lorem ipsum", photos: [] }


export let correctComment: Comment = {
    _id: "0",
    trip_id: "1",
    user_id: "0",
    userName: "Anonymous",
    rating: 2,
    text: "Test comment",
    date: Date()
}

export let incorrectComment: Comment = {
    _id: "0",
    trip_id: "0",
    user_id: "0",
    userName: "Anonymous",
    rating: -1,
    text: "Test comment",
    date: Date()
}

export let testUser: AppUser = {
    _id: "0",
    name: "TestUser",
    email: "testmail@mail.com",
    role: SecurityRole.USER
}

export let correctCartProducts = [
    {
        _id: "0",
        name: 'Trip 1',
        country: 'Turcja',
        cartCount: 5,
        rating: 0,
        startDate: Date(),
        endDate: Date(),
        price: 210,
        maxSeats: 18,
        seatsLeft: 18,
        description: "Lorem ipsum",
        photos: []
    },
    {
        _id: "1",
        name: 'Trip 2',
        country: 'Polska',
        cartCount: 1,
        rating: 2.8,
        startDate: Date(),
        endDate: Date(),
        price: 45,
        maxSeats: 11,
        seatsLeft: 11,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "2",
        name: 'Trip 3',
        country: 'Tunezja',
        cartCount: 2,
        rating: 3.2,
        startDate: Date(),
        endDate: Date(),
        price: 210,
        maxSeats: 20,
        seatsLeft: 20,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "3",
        name: 'Trip 4',
        country: 'Bułgaria',
        cartCount: 3,
        rating: 4.5,
        startDate: Date(),
        endDate: Date(),
        price: 900,
        maxSeats: 5,
        seatsLeft: 5,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "4",
        name: 'Trip 5',
        country: 'Francja',
        cartCount: 4,
        rating: 0,
        startDate: Date(),
        endDate: Date(),
        price: 400,
        maxSeats: 20,
        seatsLeft: 20,
        description: 'Lorem ipsum ',
        photos: []
    },
]


export let incorrectCartProducts = [
    {
        _id: "0",
        name: 'Trip 1',
        country: 'Turcja',
        cartCount: 5,
        rating: 0,
        startDate: Date(),
        endDate: Date(),
        price: -50,
        maxSeats: 18,
        seatsLeft: 18,
        description: "Lorem ipsum",
        photos: []
    },
    {
        _id: "1",
        name: 'Trip 2',
        country: 'Polska',
        cartCount: 1,
        rating: 2.8,
        startDate: Date(),
        endDate: Date(),
        price: 0,
        maxSeats: 11,
        seatsLeft: 11,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "2",
        name: 'Trip 3',
        country: 'Tunezja',
        cartCount: 2,
        rating: 3.2,
        startDate: Date(),
        endDate: Date(),
        price: 210,
        maxSeats: 20,
        seatsLeft: 20,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "3",
        name: 'Trip 4',
        country: 'Bułgaria',
        cartCount: 3,
        rating: 4.5,
        startDate: Date(),
        endDate: Date(),
        price: 900,
        maxSeats: 5,
        seatsLeft: 5,
        description: 'Lorem ipsum ',
        photos: []
    },
    {
        _id: "4",
        name: 'Trip 5',
        country: 'Francja',
        cartCount: -1,
        rating: 0,
        startDate: Date(),
        endDate: Date(),
        price: 400,
        maxSeats: 20,
        seatsLeft: 20,
        description: 'Lorem ipsum ',
        photos: []
    },
]

export let correctOrder: Order = {
    _id: "0",
    trip_id: "1",
    user_id: "0",
    count: 5,
    totalPrice: 300,
    date: Date()
}

export let incorrectOrder: Order = {
    _id: "0",
    trip_id: "1",
    user_id: "0",
    count: -1,
    totalPrice: 0,
    date: Date()
}

export let correctRegisterFormData = {
    name: "TestName",
    email: "testmail@mail.com",
    password: "testpassword",
    confirmPassword: "testpassword"
}

export let incorrectRegisterFormData = {
    name: "TestName",
    email: "notamail",
    password: "testpassword",
    confirmPassword: "notconfirmedpassword"
}

export let correctLoginFormData = {
    email: "testmail@mail.com",
    password: "testpassword"
}

export let incorrectLoginFormData = {
    email: "notamail",
    password: "testpassword"
}
