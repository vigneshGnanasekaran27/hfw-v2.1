#!/bin/bash

SERVER="ubuntu@65.1.108.42" 
APP_DIR="/var/www/hopefitwellness/frontend"
ARCHIVE_NAME="current.tar.gz"

# Function to deploy application
deploy() {
    echo "Deploying application to $SERVER..."

    # Upload the archive to the server
    scp $ARCHIVE_NAME $SERVER:$APP_DIR/

    ssh $SERVER << "EOF"
        set -e

        # Load asdf environment
        source ~/.asdf/asdf.sh

        # Set up the environment PATH
        export PATH="/home/ubuntu/.asdf/shims:/home/ubuntu/.asdf/bin:$PATH"

        # Change directory to the application directory
        cd /var/www/hopefitwellness/frontend

        # Clean up existing directories
        rm -rf backup/
        
        # If current directory exists, move it to backup for rollback possibility
        if [ -d "current" ]; then
            mkdir -p backup
            mv current backup/
        fi

        # Remove any existing new deployment files
        rm -rf .next node_modules package.json package-lock.json next.config.mjs tailwind.config.js postcss.config.mjs

        # Extract archive
        tar xzf current.tar.gz

        # Create new current directory
        rm -rf current
        mkdir -p current

        # Move the new build to current
        mv .next current/
        mv node_modules current/
        mv package.json current/
        mv package-lock.json current/
        mv next.config.mjs current/
        mv tailwind.config.js current/
        mv postcss.config.mjs current/
        mv jsconfig.json current/
        mv .env current/

        # Remove archive
        rm current.tar.gz

        # Change to current directory
        cd current

        # Adjust permissions
        chmod -R 755 .

        echo "Cleaning up old deployment files..."
        cd ..
        find . -maxdepth 1 -type f ! -name "current.tar.gz" -delete
        
        echo "Deployment completed successfully!"
EOF

    echo "Deployment completed."
}

# Execute deployment function
deploy