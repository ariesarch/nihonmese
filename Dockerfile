# Use MongoDB as the parent image
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Set the default command to run MongoDB
CMD ["mongod"]