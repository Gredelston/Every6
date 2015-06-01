# Every6
Olin College's Class of 2015 was challenged by President Miller to:

- Find a group of friends who care about your growth
- Every six months, read a **non-fiction** book -- preferably one outside of your area of expertise)
- Write a reflection on it
- Submit that reflection to your friends to ensure your continued growth and learning

Every6 is a platform to facilitate that.

# If You Want To Help
This site is under a lot of development right now. There are a lot of bugs I want fixed, and a lot of features I want implemented. I will happily accept pull requests. Here are some things on my bug/feature wish list, in no particular order.

### Make it not ugly
- Make it not ugly

### User settings
- Settings page -- change your email addr, change display name, unsubscribe from emails
- Delete your account
- Confirm your email upon signup

### Reflections
- Edit your submitted reflections
- Delete your submitted reflections
- Comment on reflections

### Email stuff
- Sign up for a notifying email when a particular user has submitted a reflection
- Send a digest email at the end of each period containing what everyone read, and links to their reflections
- Unsubscribe button at the bottom of every email

### Miscellaneous
- Currently all user stuff is tied to your Google User ID, rather than your Mongo doc _id. That's silly and confusing. Fix that. (Probably involves actually storing anything in sessions, which I'm currently not.)
- Middleware to prevent you from reaching certain pages (e.g. submit a reflection) when logged out
- Bug: You can be signed in on Google but not have created an account. Put some middleware to prevent that
- Olin authentication? To prevent randos
- Sort the "Everyone Else" page by period

If there are any other features you'd like to see, let me know. And definitely contribute to the project if you're so inclined -- many hands make light work.

Best,
Greg Edelston
