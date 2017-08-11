# Dev notes

Just some notes to keep track of during development


## Resources

### `/hosts`

    id: number
    name: string

### `/events/:id`

    id: number
    host: string
    location: string
    offeringType: string
    dateTime: Date


### `/events/:id/guests`

An array of guests


### `/events/:id/guests/:id`

    id: number
    name: string
    offeringIds: array
    eventId: number


### `/events/:id/offerings/:id`

    id: number
    name: string
    description: string
    photoUrl: string
    contributorIds: array
    eventId: number
