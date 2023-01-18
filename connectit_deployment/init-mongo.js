db.createUser(
    {
        user: "root",
        pwd: "bookslovescooks",
        roles: [
            {
                role: "readWrite",
                db: "Digitize"
            }
        ]
    }
);
db.createCollection("test");
