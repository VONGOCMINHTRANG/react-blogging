# Post

- id
- title
- slug
- image
- status: 1(approved) 2(pending) 3(reject)
- hot (true || false)
- content
- userId
- user: [id, username, fullname, avatar, description]
- categoryId
- category: [id, name, slug]
- createdAt

# Category

- id
- name
- slug
- status: 1(approved) 2(pending)
- createdAt

# User

- id
- username
- email
- password
- avatar : url, image_name
- status: 1(active) 2(pending) 3(banned)
- role: 1(Admin) 2(Moderator) 3(Editor) 4(User)
- permissions: "ADD_POST"
- createdAt
