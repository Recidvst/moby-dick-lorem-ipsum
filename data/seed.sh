#!/bin/bash

# db name
DATABASE="moby.db"

if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <CONTENT_TYPE> <FILE_NAME> <BOOK_TYPE>"
    exit 1
fi

# Read parameters
CONTENT_TYPE=$1
FILE_NAME=$2
BOOK_TYPE=$3

echo $CONTENT_TYPE
echo $FILE_NAME
echo $BOOK_TYPE

# Create the table if it doesn't exist
sqlite3 $DATABASE <<EOF
CREATE TABLE IF NOT EXISTS $CONTENT_TYPE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier INTEGER,
    bookType TEXT CHECK(bookType = 'moby-dick' or bookType = 'alice') DEFAULT 'moby-dick',
    content TEXT
)
EOF

# Read and parse the JSON file, then insert data into the database
jq-win64 -c '.[]' $FILE_NAME | while read -r row; do
    identifier=$(echo $row | jq-win64 -r '.id')
    content=$(echo $row | jq-win64 -r '.content')
    bookType=$(echo $BOOK_TYPE)

    sqlite3 $DATABASE <<EOF
INSERT INTO $CONTENT_TYPE (identifier, content, bookType) VALUES ('$identifier', '$(echo "$content" | sed "s/'/''/g")', '$bookType');
EOF

done

echo "Data inserted successfully for file $FILE_NAME"
