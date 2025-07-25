# Buddy_Link

### Project Overview
BuddyLink is a campus-based social networking and safety app designed to support students as they transition into unfamiliar environments. My mission is to provide a platform that connects students with local "buddies" who can help them navigate their surroundings, build friendships, and stay safe.

### The Problem
Starting life at a new school, especially in a new country, can be overwhelming. Many students arrive on campus feeling lost, isolated, and unsure how to navigate unfamiliar places. This can lead to cultural shock, disorientation, and anxiety.

### The Solution
BuddyLink addresses these challenges by offering a range of features, including:
- Buddy Matching: Connect with peers who share similar interests and experiences
- Navigation Support: Get directions to classes, events, and campus facilities
- Safety Features: Share contacts, send notifications, and verify identities for peace of mind
- Community Building: Join groups and events to expand your social circle and build relationships

### Target Audience
My app is specifically designed for:
- New students transitioning to college life
- Transfer students adjusting to a new campus environment
- International students navigating a new country and culture

### Benefits
By using BuddyLink, students can:
- Build meaningful relationships with peers
- Navigate campus with confidence
- Stay safe and connected
- Enhance their overall college experience

### Usage
I expect users to engage with the app daily to weekly, using features such as:
- Navigation support to find classes and events
- Buddy matching to connect with peers
- Safety features to stay connected with friends and family

# MVP Requirements
### User SignUp
Capture user information and store in database
Required fields:
- Name
- Email (.edu verification)
- Password
- Photo
- Major
- Preferred Contact
- Classification
- Walk preferences

### User SignIn
- Implement session-based authentication with hashing
- Verify user credentials and authenticate

### Homepage + Buddy Finder
- Destination search bar (e.g., Library, Dining Hall)
- "Find Walking Buddies" button (display page until implementation of logic)
- Dynamically match users based on preferences and location

### User Profile Page
Display:
- User profile picture
- Name
- Major
- Classification
Allow user to:
- Edit profile
- View walk count history

### Navigation
Allow users to navigate between pages:
- Homepage
- Profile Page
- Past Buddies Page
- Log Out

### User Past Buddies Page
Display past buddies
Allow users to:
- View past buddies
- Like walks with past buddies

# Visuals and Interactions
### Interesting Cursor Interaction
- The "Sign Up" link is underlined on hover.
- The Cancel Request Button displays a message on hover.
- Navigation Bar Buttons have custom tooltip.
- The "Sign In" button scales down when hovered.
- The "Edit Profile" button scales up when hovered.
- All other buttons change color shade on hover.
### UI Component with Custom Visual Styling
- Responsiveness on different screen sizes.
- Timer
- Animations and Confetti 
- Implementation of React icons to enhance UI.
- Different background color gradients.
- Shadows for visual depth.
- Bottom navigation bar for easy access.
### Loading State
- Loading spinners placeholders are used when buddy results are being fetched. This ensures smooth UX and reduces perceived wait time.

# Technical Challenge 1
### Walk Request Storage
The system stores walk requests with the following information:
- User ID: Unique identifier for the user requesting a walk
- Date: Date of the walk request
- Time: Time of the walk request
- Destination: Location of the walk destination
- Latitude and Longitude: Geographic coordinates of the destination, retrieved from a location database
This stored information enables the system to efficiently query and match walk requests based on destination and departure time.
### Buddy Matching
The system queries the database for walk requests with the same destination and departure time within a +/- 10-minute window. This is achieved by:
- Using Moment.js to create a time interval for comparison
- Querying the database for walk requests with matching destinations and departure times within the specified time interval
The buddy matching process ensures that users are paired with others who have similar walk requests, increasing the likelihood of successful matches.
### Distance Calculation
The system calculates distances between users' locations using the Haversine formula. This formula takes into account the geographic coordinates (latitude and longitude) of two points and returns the distance between them.
The Haversine formula is implemented in a function that:
- Calculates the distance between two points
- Returns an array of potential buddies meeting specific criteria, including:
  - Same date
  - Same destination
  - Departure time within the specified time interval
  - Status is active

The distance calculation enables the system to prioritize matches based on proximity, ensuring that users are paired with others who are nearby.
### Scoring Algorithm
The scoring algorithm assigns a score to each potential buddy based on user pairing preferences, including:
- Distance: Closer proximity results in higher scores
- Major: Exact matches in major result in higher scores
- Classification: Exact matches in classification result in higher scores
- User preference weights: Users can assign weights to different preferences, influencing the scoring algorithm
The scoring algorithm calculates a total score for each buddy by:
- Calculating the total weight by adding up all preference weights
- Standardizing each weight by dividing it by the total weight
- Assigning scores based on exact matches and distance intervals
The scoring algorithm enables the system to prioritize matches based on user preferences, ensuring that users are paired with others who share similar interests and characteristics.
### Score Calculation Breakdown
The score calculation process involves the following steps:
- Calculate total weight: Add up all preference weights
- Standardize weights: Divide each weight by the total weight
- Assign scores based on exact matches and distance intervals:
  - Exact matches (major and classification): score = 1 * weight
  - Distance intervals:
    - 0 - 500 meters (very close proximity): score = 1 * weight
    - 500 - 1000 meters (moderate distance): score = 0.5 * weight
    - 1000 - 1500 meters (farther apart): score = 0.25 * weight

The distance intervals were determined by analyzing the farthest distance between locations on campus, which was found to be approximately 1500 meters (from the Assembly Center to the Track Field). This range was then divided into three intervals to prioritize matches based on proximity, ensuring that buddies who are physically closest receive the highest weight in scoring. This structure aligns with real-world expectations for convenience and walkability on campus.
### Sorting
The system sorts potential matches by score using the merge sort algorithm. This algorithm consists of two helper functions:
- Merge: Merges two sorted arrays into a single sorted array
- MergeSort: Recursively sorts an array using the merge function
The merge sort algorithm ensures that potential matches are sorted efficiently and accurately, enabling the system to prioritize matches based on score.
### Caching Mechanism
The system implements a caching mechanism using a Map data structure to store cache keys and buddy scores. The cache key is a unique combination of:
- Buddy ID: Unique identifier for the buddy
- Meeting point: Geographic coordinates of the meeting point
The caching mechanism prevents redundant computation by:
- Storing buddy scores for repeated identical requests
- Retrieving cached scores instead of recalculating them
The caching mechanism ensures that the system efficiently handles repeated requests, reducing computational overhead and improving performance.

# Technical Challenge 2

### Initiating a Buddy Request
When a user initiates a buddy request, the system enters a waiting state, periodically searching for possible matches every 30 seconds for a total of 1 minute. During this time, a "Searching for a buddy" message is displayed with an estimated wait time. This waiting state is implemented using setTimeout to search for matches at 30-second intervals.

The system checks for new requests every 30 seconds and proceeds with pairing and contact sharing if a match is found within the waiting period. If no match is found after the set timeout (1 minute), the system changes state to false and displays a "No buddy found" message, allowing the user to retry or cancel the request. This ensures a timely pairing process while providing feedback to users about the search progress.
### Sharing Contact Information
Once a match is found, the system automatically shares the preferred contact methods (email or phone) of both users. This contact information is stored securely in the database using Prisma Client and is only shared when both users pair, ensuring privacy and consent.

The system retrieves the preferred contact methods from the user's profile, which was selected during the CreateProfile process. By sharing contact information securely and only when both users have consented to the match, the system protects user privacy while facilitating communication between buddies.
### Verification Code Generation and Notification
A cryptographically secure random verification code is generated and attached to the buddy pair. This code is generated using crypto.getRandomValues, which produces cryptographically secure random numbers. Since crypto.getRandomValues can return multi-digit numbers even at the smallest byte size, a function is created to extract single-digit numbers from the generated random numbers.

The generated code is sent to the users via push notification using Firebase Push service. To achieve this, unique tokens and user ID tokens are stored in the database, ordered by latest, and the most recent token is retrieved. This ensures that the verification code is delivered securely and timely to the users, confirming their match.
### Code Validation
During the in-person meetup, one buddy shows the verification code, and the other enters it into the app. The inputted code is captured using useState and converted to a string for validation. The system uses Prisma's compare method to check if the inputted code matches the generated code.

To prevent brute-force attempts, rate limiting is implemented, restricting users to three attempts. If the attempts are exhausted, users are forced to wait 15 minutes before trying again. Upon successful validation, users are redirected to another page, confirming their successful match. If the validation fails, an alert is displayed, prompting the user to try again.
### Updating Walk Count
On code match, the buddy's walk count is incremented in the User model using Prisma's update method. This ensures an accurate record of walks completed by each user. When the verification code is successfully validated, the system updates the specific user's walk count by 1, providing a reliable tracking mechanism for user activity.
### User Status Management
The system tracks user status, updating it accordingly when a user sends, cancels, or is verified and matched with a buddy. The user status can be in one of the following states:
- Default status: Active
- Status updates to Active when a user sends a request
- Status updates to Inactive when a user cancels a request or is verified and matched with a buddy

A new route is created to delete a request record when a user clicks the cancel button, ensuring seamless status management. When filtering for buddies, the system only selects active buddies, ensuring that users are matched with buddies who are currently available.
### Timer Feature for Search Interval
A reusable Timer component is created to provide a visual representation of the time remaining during the search interval. This component accepts a duration prop from the parent component (Homepage), making it flexible and adaptable for future use cases.

The Timer component utilizes useState to track the current time in milliseconds, ensuring accurate timekeeping and enabling seamless updates. useEffect is leveraged to listen for changes in time, updating every second using setTimeout, which provides a smooth and efficient countdown experience.

A timeFormat function is implemented to convert milliseconds to minutes and seconds, making the time more readable and user-friendly. This feature enhances the user experience by providing a clear visual representation of the time remaining during the search interval.



















Project Plan:
https://docs.google.com/document/d/1xoo9j7mae8e2677XxaH5VUi-aIn2QbsZgvPqw7rEBKM/edit?usp=sharing
