# Doctor Appointment Booking API

## Setup Instructions

### Prerequisites

Make sure you have Node.js installed:

```bash
node -v
npm -v

1. Clone the repository
    git clone https://github.com/your-username/appointment-system.git
    cd appointment-system

2. Install dependencies:
    npm install

3. Run the server in development mode:
    npm run start:dev




List of APIs:

1. Get All Doctors
    Method: GET
    Path: /doctors

2. Get Doctor by ID
    Method: GET
    Path: /doctors/:id

3. Get avialable slots for doctor by date
    methodL GET
    Path: /doctors/:id/available-slots/:date      (date example: 2025-08-08)

4. Create Appointment
  Method: POST
  Path: /appointments
  Payload: 
    {
      "doctor_id": 1,
      "patient_name": "Shyam",
      "date": "2025-08-08",
      "start_time": "10:30",
      "end_time": "11:00"
    }