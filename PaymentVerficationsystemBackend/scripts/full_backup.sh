#!/bin/bash

# Source directories
SOURCE_DIR="/var/www/BanaPaymentVerficationSystem/"
MONGODB_DIR="/var/lib/mongodb"

# Backup directories
BACKUP_DIR="/backup/myapp_backup"
MONGODB_BACKUP_DIR="/backup/mongodb_backup"

# Full paths to commands
RSYNC="/usr/bin/rsync"
MONGODUMP="/usr/bin/mongodump"
MONGORESTORE="/usr/bin/mongorestore"

# Load environment variables from .env
export $(cat /path/to/your/.env | xargs)

# Ensure backup directories exist
mkdir -p $BACKUP_DIR
mkdir -p $MONGODB_BACKUP_DIR

# Get the current timestamp
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

# Function to perform MongoDB backup
backup_mongo() {
    echo "Starting MongoDB backup..."
    $MONGODUMP --uri=$MONGODB_URI --out=$MONGODB_BACKUP_DIR/$TIMESTAMP
    echo "MongoDB backup completed at $MONGODB_BACKUP_DIR/$TIMESTAMP"
}

# Function to restore MongoDB backup
restore_mongo() {
    echo "Starting MongoDB restore..."
    LATEST_BACKUP=$(ls -td $MONGODB_BACKUP_DIR/* | head -1)  # Get the latest backup
    if [ -d "$LATEST_BACKUP" ]; then
        $MONGORESTORE --uri=$MONGODB_URI $LATEST_BACKUP
        echo "MongoDB restore completed from $LATEST_BACKUP"
    else
        echo "No MongoDB backup found!"
    fi
}

# Check command-line argument
if [ "$1" == "backup" ]; then
    backup_mongo
elif [ "$1" == "restore" ]; then
    restore_mongo
else
    echo "Usage: $0 {backup|restore}"
    exit 1
fi

#./full_backup.sh backup
#./full_backup.sh restore

