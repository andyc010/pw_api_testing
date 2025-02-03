import { test, expect } from '@playwright/test';
import { url } from 'inspector';

// Using the API at https://icanhazdadjoke.com

test.describe("icanhazdadjoke.com tests", () => {
    test('Get a random dad joke', async ({ request }) => {
        const dadJoke = await request.get('');
        
        // Test for OK status
        expect(dadJoke).toBeOK();

        // Test that the status code is actually 200
        expect(dadJoke.status()).toBe(200);
        
        // The following lines are just for debug only
        const body = await dadJoke.json();
        console.log(body);
    });
    
    test('Get a specific dad joke', async({ request }) => {
        // This test gets the joke with ID = usrcaMuszd
        // Joke: What's the worst thing about ancient history class? The teachers tend to Babylon.
        const specificJoke = await request.get('/j/usrcaMuszd');
        const json = await specificJoke.json();
        expect(json.joke).toBe('What\'s the worst thing about ancient history class? The teachers tend to Babylon.');
    });
    
    test('Search for a computer dad joke', async({ request }) => {
        const computerJoke = await request.get('/search?term=computer');
        expect(computerJoke).toBeOK();
        const body = await computerJoke.json();
        console.log(body);
    });
});

// Using the API at https://restful-booker.herokuapp.com/, needed tests that use POST, PUT &
//  DELETE methods

test.describe("restful-booking tests", () => {
    // This is required to change & delete information below.
    let auth_token = "";

    // This ID number is required to fetch a booking that is created below.
    let ID_number = -1000;
    
    test("Get all bookings", async({ request }) => {
        const bookings = await request.get("https://restful-booker.herokuapp.com/booking");
        expect(bookings.status()).toBe(200);
        expect(bookings).toBeOK();
        const body = await bookings.json();
        console.log(body);
    });

    test("Get auth token", async({ request }) => {
        const token = await request.post("https://restful-booker.herokuapp.com/auth", 
            {
                data: {
                    "username" : "admin",
                    "password" : "password123"
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        expect(token.status()).toBe(200);
        const body = await token.json();
        // Since the token will be different everytime this test will be run,
        //  at least ensure that a non-false/non-null/non-undefined value is present.
        expect(token).toBeTruthy();
        // Get the authorization token to be used in some tests below
        auth_token = body.token;
        console.log(body.token);
        
    });

    test("Add a booking", async({ request }) => {
        const addbooking = await request.post("https://restful-booker.herokuapp.com/booking", 
            {
                data: {
                    "firstname" : "Buster",
                    "lastname" : "Brown",
                    "totalprice" : "500",
                    "depositpaid" : "true",
                    "bookingdates" : {
                        "checkin" : "2024-08-13",
                        "checkout" : "2024-08-31"
                    },
                    "additionalneeds" : "Internet access"
                },
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }
        );

        expect(addbooking.status()).toBe(200);
        const body = await addbooking.json();
        expect(addbooking).toBeTruthy();
        // Get the ID number to be used in a test after this one
        ID_number = body.bookingid;
        console.log(body.bookingid);
    });

    test('Update the created booking', async({ request }) => {
        const updatebooking = await request.put("https://restful-booker.herokuapp.com/booking/" + ID_number.toString(),
            {
                data: {
                    "firstname" : "Barbara",
                    "lastname" : "Brownlee",
                    "totalprice" : "1000",
                    "depositpaid" : "false",
                        "bookingdates" : {
                            "checkin" : "2023-09-14",
                            "checkout" : "2023-09-30"
                        },
                        "additionalneeds" : "Conference room"
                },
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                    "Cookie" : "token=" + auth_token.toString()
                }
            }
        );

        expect(updatebooking.status()).toBe(200);
        const body = await updatebooking.json();
        console.log(body);
    });

    test('Delete the booking', async({ request }) => {
        const deletebooking = await request.delete("https://restful-booker.herokuapp.com/booking/" + ID_number.toString(),
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Cookie" : "token=" + auth_token.toString()
                }
            }
        );

        expect(deletebooking.status()).toBe(201);
        // The response isn't in JSON, so only whatever text appears after the deletion is outputted ("Created")
        const body = await deletebooking.text();
        console.log(body);
    });
});
