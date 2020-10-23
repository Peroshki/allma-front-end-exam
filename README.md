## Setup

To run this application, navigate to the project directory and run:

### `npm install`

to install all the prerequisites that are necessary for the application to run. Then, run:

### `npm start`

and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br/>

You can also run this application in a Docker container. To do so, open a command prompt window (MacOS) or launch the Docker terminal (Windows), navigate to the project directory and build the docker image using

### `docker build -t react-app .`

Then, you need to find out the IP address of your Docker machine by running

### `docker-machine ip default`

Finally, run the containerized application by running

### `docker run -p 4000:3000 -it react-app`

and navigate to **http://\<docker-machine-ip\>:4000** to view it in the broswer. For example, if your Docker machine's IP address is **192.168.99.100**, then you would navigate to  [http://192.168.99.100:4000](http://192.168.99.100:4000) to view the application.

## Usage

When you open the application in your broswer, you will notice that the page is split into two columns. The left column contains the search bar and filter options, while the right column contains the incident report cards, as well as some summary statistics.

Use the search bar to filter incidents by their name or summary description. You can also use the checkboxes below the search bar to filter incidents by their status ID.

Clicking on the hyperlink provided in the Channel section of an incident report card will open the Slack channel corresponding to the incident you selected. Make sure you have the Slack desktop application installed for the link to work properly.
