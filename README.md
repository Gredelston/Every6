# Every6
Olin College's Class of 2015 was challenged by President Miller to:

- Find a group of friends who care about your growth
- Every six months, read a **non-fiction** book -- preferably one outside of your area of expertise)
- Write a reflection on it
- Submit that reflection to your friends to ensure your continued growth and learning

Every6 is a platform to facilitate that.

# If You Want To Help
This site is under a lot of development right now. There are a lot of bugs I want fixed, and a lot of features I want implemented. I will happily accept pull requests. Here are some things on my bug/feature wish list, in no particular order.

- Make it not ugly
- Tell us which book you're currently reading
- See what your friends are reading
- Settings page -- change your email, display name, etc.
- Delete your account
- Confirm your email so you can't get signed up by someone else
- Edit your submitted reflections
- Comment on reflections
- Sign up for a notifying email when a particular user has submitted a reflection
- Send a digest email at the end of each period containing what everyone read, and links to their reflections
- Currently all user stuff is tied to your Google User ID, rather than your Mongo _id. That's silly and confusing. Fix that. (Probably involves actually storing anything in sessions, which I'm currently not.)
- Middleware to prevent you from reaching certain pages (e.g. submit a reflection) when logged out
- Bug: You can be signed in on Google but not have created an account. Put some middleware to prevent that
- Olin authentication? To prevent randos

If there are any other features you'd like to see, let me know. And definitely contribute to the project if you're so inclined -- many hands make light work.

Best,
Greg Edelston
