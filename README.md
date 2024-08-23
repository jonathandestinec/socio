Todo

<!-- We've gotten to the Pinned Users recent activity list -->

[1] Create Pinned Users Notification.

Algorithm:
    Anytime a user performs an action, an activity should be created with the user's id as userId.

Why:
    This is so that whenever a pinned user performs an action that's being tracked, 
    the user fetching the pinned users can just fetch for that user's activities. Then get the latest

Get all activities for each pinned user:
    