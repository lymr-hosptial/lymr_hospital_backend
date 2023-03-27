


# lymr_hospital_backend Docker Microservice Project

<h3>This project uses Docker and Kubernetes to containerize a microservice and make it easy to run and deploy.</h3>

## Prerequisites
<ul>
<li>Docker installed on your machine</li>
<li>Docker Compose installed on your machine</li>
</ul>

## Running the Microservice
<ul><li>Clone the repository:</li></ul>
<code>git clone https://github.com/[username]/[repository].git
</code><br>
<ul><li>Change into the project directory:</li></ul>
<code>cd [repository]</code><br><br>
<ul><li>Build the Docker image:</li></ul>
<code>docker-compose build</code><br><br>
<ul>
<li>Start the Docker containers:</li></ul>
<code>docker-compose up</code><br><br>

The microservice should now be running and accessible at http://localhost:[port], where [port] is the port specified in the docker-compose.yml file.

## Stopping the Microservice
To stop the Docker containers, press Ctrl + C in the terminal window where the containers were started ( VSCode Terminal ) .

To stop and remove the containers, run the following command:<br>
<code>docker-compose down</code><br><br>
## Deploying the Microservice
To deploy the microservice to a production environment, you will need to build the Docker image and push it to a Docker registry such as Docker Hub or a private registry. Then, on the production server, pull the image and run the containers using Docker Compose.
<ul><li>Build the Docker image:</li></ul>
<code>docker-compose build</code><br><br>
<ul><li>Tag the image with the Docker registry address:</li></ul>
<code>docker tag [image-name] [registry-address]/[image-name]:[version]</code><br><br>
<ul><li>Push the image to the Docker registry:</li></ul>
<code>docker push [registry-address]/[image-name]:[version]</code><br><br><br>
<ul><li>On the production server, pull the image from the Docker registry:</li></ul>
<code>docker pull [registry-address]/[image-name]:[version]</code><br><br>
<ul><li>Start the containers using Docker Compose:</li></ul>
<code>docker-compose up -d</code><br><br>
The microservice should now be running in production.



