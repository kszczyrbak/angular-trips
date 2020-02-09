export interface Order { 
    _id?: string
    trip_id: string
    user_id: string
    count: number
    totalPrice: number,
    date: string
}